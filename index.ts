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
      title: (typeof Handlers.Config.responses)[Status]["title"];
      detail?: string;
      data: DataType;
    };
  }

  export namespace Config {
    export const responses = {
      100: { title: "Continue", ok: true },
      101: { title: "Switching Protocols", ok: true },
      102: { title: "Processing", ok: true },
      103: { title: "Early Hints", ok: true },

      200: { title: "OK", ok: true },
      201: { title: "Created", ok: true },
      202: { title: "Accepted", ok: true },
      203: { title: "Non-Authoritative Information", ok: true },
      204: { title: "No Content", ok: true },
      205: { title: "Reset Content", ok: true },
      206: { title: "Partial Content", ok: true },
      207: { title: "Multi-Status", ok: true },
      208: { title: "Already Reported", ok: true },
      226: { title: "IM Used", ok: true },

      300: { title: "Multiple Choices", ok: true },
      301: { title: "Moved Permanently", ok: true },
      302: { title: "Found", ok: true },
      303: { title: "See Other", ok: true },
      304: { title: "Not Modified", ok: true },
      305: { title: "Use Proxy", ok: true },
      306: { title: "Switch Proxy", ok: true },
      307: { title: "Temporary Redirect", ok: true },
      308: { title: "Permanent Redirect", ok: true },

      400: { title: "Bad Request", ok: false },
      401: { title: "Unauthorized", ok: false },
      402: { title: "Payment Required", ok: false },
      403: { title: "Forbidden", ok: false },
      404: { title: "Not Found", ok: false },
      405: { title: "Method Not Allowed", ok: false },
      406: { title: "Not Acceptable", ok: false },
      407: { title: "Proxy Authentication Required", ok: false },
      408: { title: "Request Timeout", ok: false },
      409: { title: "Conflict", ok: false },
      410: { title: "Gone", ok: false },
      411: { title: "Length Required", ok: false },
      412: { title: "Precondition Failed", ok: false },
      413: { title: "Payload Too Large", ok: false },
      414: { title: "URI Too Long", ok: false },
      415: { title: "Unsupported Media Type", ok: false },
      416: { title: "Range Not Satisfiable", ok: false },
      417: { title: "Expectation Failed", ok: false },
      418: { title: "I'm a teapot", ok: false },
      421: { title: "Misdirected Request", ok: false },
      422: { title: "Unprocessable Entity", ok: false },
      423: { title: "Locked", ok: false },
      424: { title: "Failed Dependency", ok: false },
      425: { title: "Too Early", ok: false },
      426: { title: "Upgrade Required", ok: false },
      428: { title: "Precondition Required", ok: false },
      429: { title: "Too Many Requests", ok: false },
      431: { title: "Request Header Fields Too Large", ok: false },
      451: { title: "Unavailable For Legal Reasons", ok: false },

      500: { title: "Internal Server Error", ok: false },
      501: { title: "Not Implemented", ok: false },
      502: { title: "Bad Gateway", ok: false },
      503: { title: "Service Unavailable", ok: false },
      504: { title: "Gateway Timeout", ok: false },
      505: { title: "HTTP Version Not Supported", ok: false },
      506: { title: "Variant Also Negotiates", ok: false },
      507: { title: "Insufficient Storage", ok: false },
      508: { title: "Loop Detected", ok: false },
      510: { title: "Not Extended", ok: false },
      511: { title: "Network Authentication Required", ok: false },

      // Microsoft IIS
      440: { title: "Login Timeout", ok: false },
      449: { title: "Retry With", ok: false },

      // NGINX
      444: { title: "No Response", ok: false },
      494: { title: "Request header too large", ok: false },
      495: { title: "SSL Certificate Error", ok: false },
      496: { title: "SSL Certificate Required", ok: false },
      497: { title: "HTTP Request Sent to HTTPS Port", ok: false },
      499: { title: "Client Closed Request", ok: false },

      // Cloudflare
      520: { title: "Web Server Returned an Unknown Error", ok: false },
      521: { title: "Web Server is Down", ok: false },
      522: { title: "Connection Timed Out", ok: false },
      523: { title: "Origin Is Unreachable", ok: false },
      524: { title: "A Timeout Occurred", ok: false },
      525: { title: "SSL Handshake Failed", ok: false },
      526: { title: "Invalid SSL Certificate", ok: false },

      // Non-Standard
      631: { title: "Non-Standard Information", ok: true },
      632: { title: "Non-Standard Success", ok: true },
      633: { title: "Non-Standard Redirect", ok: true },
      634: { title: "Non-Standard Client Error", ok: false },
      635: { title: "Non-Standard Server Error", ok: false },

      // Custom
      600: { title: "Not a Response", ok: false },
    } as const satisfies Record<number, { title: string; ok: boolean }>;
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
      ActionReturn extends Promise<
        Handlers.Types.Response<
          Handlers.Types.AcceptableStatus,
          Handlers.Types.AcceptableDataType
        >
      >
    >(action: () => ActionReturn) {
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
        detail?: Handlers.Types.Response<Status, DataType>["detail"];
      }
    ): Handlers.Types.Response<Status, DataType> {
      return {
        status,
        ok: Handlers.Config.responses[status]["ok"],
        title: Handlers.Config.responses[status]["title"],
        detail: payload.detail,
        data: payload.data,
      };
    }
  }
}
export default Handlers;
