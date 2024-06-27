# **Next Handle**

A small library which provides a uniform way to handle server actions in Next.js applications.

## Installation

```bash
npm install --save next-handle
```

## Basic Usage

Use Next Handle to create uniform, fully-typed server actions. The following example creates a server action that registers a new user.

```ts
"use server";

// ... import

export async function register(payload: { values: RegisterFormValues }) {
  return await Handlers.Service.action(async () => {
    // ... validate input

    if (!valid) {
      return Handlers.Service.sendResponse(400, {
        description: "Invalid payload",
        data: null,
      });
    }

    // ... hash password

    // ... check if user already exists

    if (userExists) {
      return Handlers.Service.sendResponse(409, {
        description: "User already exists",
        data: null,
      });
    }

    // ... create user

    return Handlers.Service.sendResponse(201, {
      description: `User created with details: ${details}`,
      data: null,
    });
  });
}
```

Now you can use `register` as a server action, and receive an automatically fully-typed response.

```ts
const response = await register(values);
//    ^? typeof response = Handlers.Basic.Response<500, null> | Handlers.Basic.Response<400 | 409 | 201, null>
```

The possible status code and data types are automatically included in the return type. All actions might encounter unexpected errors, which are caught automatically, and logged when in development mode. This is why any action could return a `Handlers.Types.Response<500, null>`

## Response Codes

Response codes mostly follow those as defined by [this page](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes). In addition, _IIS_, _NGINX_, and _Cloudflare_ common response codes are included.

Next Handle also provides "non-standard" codes, `631`, `632`, `633`, `634`, `635`, with the last digit representing the category of the response (`1` for _'information'_, `2` for _'success'_...). **When using these codes, it is important to include an adequate description in the response**.
