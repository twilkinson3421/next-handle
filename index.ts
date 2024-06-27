import chalk from "chalk";
import konsole from "chalk-konsole";

namespace Handlers {
  export namespace Types {
    export type AcceptableDataType =
      | string
      | number
      | boolean
      | object
      | null
      | Function
      | Array<any>
      | Date
      | Promise<AcceptableDataType>
      | Buffer
      | Symbol
      | BigInt
      | Uint8Array;

    export type AcceptableStatus = keyof typeof Handlers.Config.responses;
    export type StatusIsOk<Status extends AcceptableStatus> =
      (typeof Handlers.Config.responses)[Status]["ok"];

    export type Response<
      Status extends AcceptableStatus,
      DataType extends AcceptableDataType
    > = {
      status: Status;
      ok: StatusIsOk<Status>;
      message: (typeof Handlers.Config.responses)[Status]["message"];
      description?: string;
      data: DataType;
    };
  }

  export namespace Config {
    export const responses = {
      100: { message: "Continue", ok: true },
      101: { message: "Switching Protocols", ok: true },
      102: { message: "Processing", ok: true },
      103: { message: "Early Hints", ok: true },

      200: { message: "OK", ok: true },
      201: { message: "Created", ok: true },
      202: { message: "Accepted", ok: true },
      203: { message: "Non-Authoritative Information", ok: true },
      204: { message: "No Content", ok: true },
      205: { message: "Reset Content", ok: true },
      206: { message: "Partial Content", ok: true },
      207: { message: "Multi-Status", ok: true },
      208: { message: "Already Reported", ok: true },
      226: { message: "IM Used", ok: true },

      300: { message: "Multiple Choices", ok: true },
      301: { message: "Moved Permanently", ok: true },
      302: { message: "Found", ok: true },
      303: { message: "See Other", ok: true },
      304: { message: "Not Modified", ok: true },
      305: { message: "Use Proxy", ok: true },
      306: { message: "Switch Proxy", ok: true },
      307: { message: "Temporary Redirect", ok: true },
      308: { message: "Permanent Redirect", ok: true },

      400: { message: "Bad Request", ok: false },
      401: { message: "Unauthorized", ok: false },
      402: { message: "Payment Required", ok: false },
      403: { message: "Forbidden", ok: false },
      404: { message: "Not Found", ok: false },
      405: { message: "Method Not Allowed", ok: false },
      406: { message: "Not Acceptable", ok: false },
      407: { message: "Proxy Authentication Required", ok: false },
      408: { message: "Request Timeout", ok: false },
      409: { message: "Conflict", ok: false },
      410: { message: "Gone", ok: false },
      411: { message: "Length Required", ok: false },
      412: { message: "Precondition Failed", ok: false },
      413: { message: "Payload Too Large", ok: false },
      414: { message: "URI Too Long", ok: false },
      415: { message: "Unsupported Media Type", ok: false },
      416: { message: "Range Not Satisfiable", ok: false },
      417: { message: "Expectation Failed", ok: false },
      418: { message: "I'm a teapot", ok: false },
      421: { message: "Misdirected Request", ok: false },
      422: { message: "Unprocessable Entity", ok: false },
      423: { message: "Locked", ok: false },
      424: { message: "Failed Dependency", ok: false },
      425: { message: "Too Early", ok: false },
      426: { message: "Upgrade Required", ok: false },
      428: { message: "Precondition Required", ok: false },
      429: { message: "Too Many Requests", ok: false },
      431: { message: "Request Header Fields Too Large", ok: false },
      451: { message: "Unavailable For Legal Reasons", ok: false },

      500: { message: "Internal Server Error", ok: false },
      501: { message: "Not Implemented", ok: false },
      502: { message: "Bad Gateway", ok: false },
      503: { message: "Service Unavailable", ok: false },
      504: { message: "Gateway Timeout", ok: false },
      505: { message: "HTTP Version Not Supported", ok: false },
      506: { message: "Variant Also Negotiates", ok: false },
      507: { message: "Insufficient Storage", ok: false },
      508: { message: "Loop Detected", ok: false },
      510: { message: "Not Extended", ok: false },
      511: { message: "Network Authentication Required", ok: false },

      // Microsoft IIS
      440: { message: "Login Timeout", ok: false },
      449: { message: "Retry With", ok: false },

      // NGINX
      444: { message: "No Response", ok: false },
      494: { message: "Request header too large", ok: false },
      495: { message: "SSL Certificate Error", ok: false },
      496: { message: "SSL Certificate Required", ok: false },
      497: { message: "HTTP Request Sent to HTTPS Port", ok: false },
      499: { message: "Client Closed Request", ok: false },

      // Cloudflare
      520: { message: "Web Server Returned an Unknown Error", ok: false },
      521: { message: "Web Server is Down", ok: false },
      522: { message: "Connection Timed Out", ok: false },
      523: { message: "Origin Is Unreachable", ok: false },
      524: { message: "A Timeout Occurred", ok: false },
      525: { message: "SSL Handshake Failed", ok: false },
      526: { message: "Invalid SSL Certificate", ok: false },

      // Non-Standard
      631: { message: "Non-Standard Information", ok: true },
      632: { message: "Non-Standard Success", ok: true },
      633: { message: "Non-Standard Redirect", ok: true },
      634: { message: "Non-Standard Client Error", ok: false },
      635: { message: "Non-Standard Server Error", ok: false },

      // Custom
      600: { message: "Not a Response", ok: false },
    } as const satisfies Record<number, { message: string; ok: boolean }>;
  }

  export namespace Methods {
    export namespace Basic {
      export function serverError(): Handlers.Types.Response<500, null> {
        return Handlers.Service.sendResponse(500, {
          data: null,
        });
      }
    }
  }

  export namespace Service {
    export async function action<
      Status extends Handlers.Types.AcceptableStatus,
      DataType extends Handlers.Types.AcceptableDataType
    >(
      action: () => Promise<Handlers.Types.Response<Status, DataType>>
    ): Promise<
      | Handlers.Types.Response<Status, DataType>
      | Handlers.Types.Response<500, null>
    > {
      try {
        return await action();
      } catch (error) {
        if (process.env.NODE_ENV === "development")
          konsole.err(
            `Failed to execute server action`,
            `${chalk.grey(chalk.italic(error))}`
          );

        return Handlers.Methods.Basic.serverError();
      }
    }

    export function sendResponse<
      Status extends Handlers.Types.Response<
        Handlers.Types.AcceptableStatus,
        Handlers.Types.AcceptableDataType
      >["status"],
      DataType extends Handlers.Types.AcceptableDataType
    >(
      status: Status,
      payload: {
        data: DataType;
        description?: Handlers.Types.Response<Status, DataType>["description"];
      }
    ): Handlers.Types.Response<Status, DataType> {
      return {
        status,
        ok: Handlers.Config.responses[status]["ok"],
        message: Handlers.Config.responses[status]["message"],
        description: payload.description,
        data: payload.data,
      };
    }
  }
}
export default Handlers;
