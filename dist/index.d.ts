declare namespace Handlers {
    namespace Types {
        type AcceptableDataType = string | number | boolean | object | null | Function | Array<any> | Date | Promise<AcceptableDataType> | Buffer | Symbol | BigInt | Uint8Array;
        type AcceptableStatus = keyof typeof Handlers.Config.responses;
        type StatusIsOk<Status extends AcceptableStatus> = (typeof Handlers.Config.responses)[Status]["ok"];
        type Response<Status extends AcceptableStatus, DataType extends AcceptableDataType> = {
            status: Status;
            ok: StatusIsOk<Status>;
            message: (typeof Handlers.Config.responses)[Status]["message"];
            description?: string;
            data: DataType;
        };
    }
    namespace Config {
        const responses: {
            readonly 100: {
                readonly message: "Continue";
                readonly ok: true;
            };
            readonly 101: {
                readonly message: "Switching Protocols";
                readonly ok: true;
            };
            readonly 102: {
                readonly message: "Processing";
                readonly ok: true;
            };
            readonly 103: {
                readonly message: "Early Hints";
                readonly ok: true;
            };
            readonly 200: {
                readonly message: "OK";
                readonly ok: true;
            };
            readonly 201: {
                readonly message: "Created";
                readonly ok: true;
            };
            readonly 202: {
                readonly message: "Accepted";
                readonly ok: true;
            };
            readonly 203: {
                readonly message: "Non-Authoritative Information";
                readonly ok: true;
            };
            readonly 204: {
                readonly message: "No Content";
                readonly ok: true;
            };
            readonly 205: {
                readonly message: "Reset Content";
                readonly ok: true;
            };
            readonly 206: {
                readonly message: "Partial Content";
                readonly ok: true;
            };
            readonly 207: {
                readonly message: "Multi-Status";
                readonly ok: true;
            };
            readonly 208: {
                readonly message: "Already Reported";
                readonly ok: true;
            };
            readonly 226: {
                readonly message: "IM Used";
                readonly ok: true;
            };
            readonly 300: {
                readonly message: "Multiple Choices";
                readonly ok: true;
            };
            readonly 301: {
                readonly message: "Moved Permanently";
                readonly ok: true;
            };
            readonly 302: {
                readonly message: "Found";
                readonly ok: true;
            };
            readonly 303: {
                readonly message: "See Other";
                readonly ok: true;
            };
            readonly 304: {
                readonly message: "Not Modified";
                readonly ok: true;
            };
            readonly 305: {
                readonly message: "Use Proxy";
                readonly ok: true;
            };
            readonly 306: {
                readonly message: "Switch Proxy";
                readonly ok: true;
            };
            readonly 307: {
                readonly message: "Temporary Redirect";
                readonly ok: true;
            };
            readonly 308: {
                readonly message: "Permanent Redirect";
                readonly ok: true;
            };
            readonly 400: {
                readonly message: "Bad Request";
                readonly ok: false;
            };
            readonly 401: {
                readonly message: "Unauthorized";
                readonly ok: false;
            };
            readonly 402: {
                readonly message: "Payment Required";
                readonly ok: false;
            };
            readonly 403: {
                readonly message: "Forbidden";
                readonly ok: false;
            };
            readonly 404: {
                readonly message: "Not Found";
                readonly ok: false;
            };
            readonly 405: {
                readonly message: "Method Not Allowed";
                readonly ok: false;
            };
            readonly 406: {
                readonly message: "Not Acceptable";
                readonly ok: false;
            };
            readonly 407: {
                readonly message: "Proxy Authentication Required";
                readonly ok: false;
            };
            readonly 408: {
                readonly message: "Request Timeout";
                readonly ok: false;
            };
            readonly 409: {
                readonly message: "Conflict";
                readonly ok: false;
            };
            readonly 410: {
                readonly message: "Gone";
                readonly ok: false;
            };
            readonly 411: {
                readonly message: "Length Required";
                readonly ok: false;
            };
            readonly 412: {
                readonly message: "Precondition Failed";
                readonly ok: false;
            };
            readonly 413: {
                readonly message: "Payload Too Large";
                readonly ok: false;
            };
            readonly 414: {
                readonly message: "URI Too Long";
                readonly ok: false;
            };
            readonly 415: {
                readonly message: "Unsupported Media Type";
                readonly ok: false;
            };
            readonly 416: {
                readonly message: "Range Not Satisfiable";
                readonly ok: false;
            };
            readonly 417: {
                readonly message: "Expectation Failed";
                readonly ok: false;
            };
            readonly 418: {
                readonly message: "I'm a teapot";
                readonly ok: false;
            };
            readonly 421: {
                readonly message: "Misdirected Request";
                readonly ok: false;
            };
            readonly 422: {
                readonly message: "Unprocessable Entity";
                readonly ok: false;
            };
            readonly 423: {
                readonly message: "Locked";
                readonly ok: false;
            };
            readonly 424: {
                readonly message: "Failed Dependency";
                readonly ok: false;
            };
            readonly 425: {
                readonly message: "Too Early";
                readonly ok: false;
            };
            readonly 426: {
                readonly message: "Upgrade Required";
                readonly ok: false;
            };
            readonly 428: {
                readonly message: "Precondition Required";
                readonly ok: false;
            };
            readonly 429: {
                readonly message: "Too Many Requests";
                readonly ok: false;
            };
            readonly 431: {
                readonly message: "Request Header Fields Too Large";
                readonly ok: false;
            };
            readonly 451: {
                readonly message: "Unavailable For Legal Reasons";
                readonly ok: false;
            };
            readonly 500: {
                readonly message: "Internal Server Error";
                readonly ok: false;
            };
            readonly 501: {
                readonly message: "Not Implemented";
                readonly ok: false;
            };
            readonly 502: {
                readonly message: "Bad Gateway";
                readonly ok: false;
            };
            readonly 503: {
                readonly message: "Service Unavailable";
                readonly ok: false;
            };
            readonly 504: {
                readonly message: "Gateway Timeout";
                readonly ok: false;
            };
            readonly 505: {
                readonly message: "HTTP Version Not Supported";
                readonly ok: false;
            };
            readonly 506: {
                readonly message: "Variant Also Negotiates";
                readonly ok: false;
            };
            readonly 507: {
                readonly message: "Insufficient Storage";
                readonly ok: false;
            };
            readonly 508: {
                readonly message: "Loop Detected";
                readonly ok: false;
            };
            readonly 510: {
                readonly message: "Not Extended";
                readonly ok: false;
            };
            readonly 511: {
                readonly message: "Network Authentication Required";
                readonly ok: false;
            };
            readonly 440: {
                readonly message: "Login Timeout";
                readonly ok: false;
            };
            readonly 449: {
                readonly message: "Retry With";
                readonly ok: false;
            };
            readonly 444: {
                readonly message: "No Response";
                readonly ok: false;
            };
            readonly 494: {
                readonly message: "Request header too large";
                readonly ok: false;
            };
            readonly 495: {
                readonly message: "SSL Certificate Error";
                readonly ok: false;
            };
            readonly 496: {
                readonly message: "SSL Certificate Required";
                readonly ok: false;
            };
            readonly 497: {
                readonly message: "HTTP Request Sent to HTTPS Port";
                readonly ok: false;
            };
            readonly 499: {
                readonly message: "Client Closed Request";
                readonly ok: false;
            };
            readonly 520: {
                readonly message: "Web Server Returned an Unknown Error";
                readonly ok: false;
            };
            readonly 521: {
                readonly message: "Web Server is Down";
                readonly ok: false;
            };
            readonly 522: {
                readonly message: "Connection Timed Out";
                readonly ok: false;
            };
            readonly 523: {
                readonly message: "Origin Is Unreachable";
                readonly ok: false;
            };
            readonly 524: {
                readonly message: "A Timeout Occurred";
                readonly ok: false;
            };
            readonly 525: {
                readonly message: "SSL Handshake Failed";
                readonly ok: false;
            };
            readonly 526: {
                readonly message: "Invalid SSL Certificate";
                readonly ok: false;
            };
            readonly 631: {
                readonly message: "Non-Standard Information";
                readonly ok: true;
            };
            readonly 632: {
                readonly message: "Non-Standard Success";
                readonly ok: true;
            };
            readonly 633: {
                readonly message: "Non-Standard Redirect";
                readonly ok: true;
            };
            readonly 634: {
                readonly message: "Non-Standard Client Error";
                readonly ok: false;
            };
            readonly 635: {
                readonly message: "Non-Standard Server Error";
                readonly ok: false;
            };
            readonly 600: {
                readonly message: "Not a Response";
                readonly ok: false;
            };
        };
    }
    namespace Methods {
        namespace Basic {
            function serverError(): Handlers.Types.Response<500, null>;
        }
    }
    namespace Service {
        function action<Status extends Handlers.Types.AcceptableStatus, DataType extends Handlers.Types.AcceptableDataType>(action: () => Promise<Handlers.Types.Response<Status, DataType>>): Promise<Handlers.Types.Response<Status, DataType> | Handlers.Types.Response<500, null>>;
        function sendResponse<Status extends Handlers.Types.Response<Handlers.Types.AcceptableStatus, Handlers.Types.AcceptableDataType>["status"], DataType extends Handlers.Types.AcceptableDataType>(status: Status, payload: {
            data: DataType;
            description?: Handlers.Types.Response<Status, DataType>["description"];
        }): Handlers.Types.Response<Status, DataType>;
    }
}
export default Handlers;
