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
        detail: "Invalid payload",
        data: null,
      });
    }

    // ... hash password

    // ... check if user already exists

    if (userExists) {
      return Handlers.Service.sendResponse(409, {
        detail: "User already exists",
        data: null,
      });
    }

    // ... create user

    return Handlers.Service.sendResponse(201, {
      detail: `User created with email: ${userEmail}`,
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

## Response Object

The object returned in a response contains the following properties:

| Property | Generic Type | Description                                                             |
| -------- | ------------ | ----------------------------------------------------------------------- |
| `status` | `number`     | The status code of the response.                                        |
| `ok`     | `boolean`    | Whether the response was successful (determined by status).             |
| `title`  | `string`     | A standard title (determined by status).                                |
| `detail` | `string`     | A human-readable explanation specific to this occurrence of the problem |
| `data`   | `any`        | The data returned in the response.                                      |

The exact types of `status`, `ok`, `title`, and `data` will be included in the type of the response. For example, a response of type `Handlers.Types.Response<200, User>` will have the following types:

| Property | Exact Type |
| -------- | ---------- |
| `status` | `200`      |
| `ok`     | `true`     |
| `title`  | `"OK"`     |
| `detail` | `string`   |
| `data`   | `User`     |

## Response Codes

Response codes mostly follow those as defined by [this page](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes). In addition, _IIS_, _NGINX_, and _Cloudflare_ common response codes are included.

Next Handle also provides "non-standard" codes, `631`, `632`, `633`, `634`, `635`, with the last digit representing the category of the response (`1` for _'information'_, `2` for _'success'_...). **When using these codes, it is important to include an adequate description in the response**.
