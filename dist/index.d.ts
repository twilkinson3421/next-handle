declare namespace Handlers {
    namespace Types {
        type AcceptableDataType = string | number | boolean | object | null | Function | Array<any> | Date | Promise<AcceptableDataType> | Buffer | Symbol | BigInt | Uint8Array;
        type AcceptableStatus = keyof typeof Handlers.Config.responses;
        type StatusIsOk<Status extends AcceptableStatus> = (typeof Handlers.Config.responses)[Status]["ok"];
        type Response<Status extends AcceptableStatus, DataType extends AcceptableDataType> = {
            status: Status;
            ok: StatusIsOk<Status>;
            title: (typeof Handlers.Config.responses)[Status]["title"];
            detail?: string;
            data: DataType;
        };
    }
    namespace Config {
        const responses: {
            readonly 100: {
                readonly title: "Continue";
                readonly ok: true;
            };
            readonly 101: {
                readonly title: "Switching Protocols";
                readonly ok: true;
            };
            readonly 102: {
                readonly title: "Processing";
                readonly ok: true;
            };
            readonly 103: {
                readonly title: "Early Hints";
                readonly ok: true;
            };
            readonly 200: {
                readonly title: "OK";
                readonly ok: true;
            };
            readonly 201: {
                readonly title: "Created";
                readonly ok: true;
            };
            readonly 202: {
                readonly title: "Accepted";
                readonly ok: true;
            };
            readonly 203: {
                readonly title: "Non-Authoritative Information";
                readonly ok: true;
            };
            readonly 204: {
                readonly title: "No Content";
                readonly ok: true;
            };
            readonly 205: {
                readonly title: "Reset Content";
                readonly ok: true;
            };
            readonly 206: {
                readonly title: "Partial Content";
                readonly ok: true;
            };
            readonly 207: {
                readonly title: "Multi-Status";
                readonly ok: true;
            };
            readonly 208: {
                readonly title: "Already Reported";
                readonly ok: true;
            };
            readonly 226: {
                readonly title: "IM Used";
                readonly ok: true;
            };
            readonly 300: {
                readonly title: "Multiple Choices";
                readonly ok: true;
            };
            readonly 301: {
                readonly title: "Moved Permanently";
                readonly ok: true;
            };
            readonly 302: {
                readonly title: "Found";
                readonly ok: true;
            };
            readonly 303: {
                readonly title: "See Other";
                readonly ok: true;
            };
            readonly 304: {
                readonly title: "Not Modified";
                readonly ok: true;
            };
            readonly 305: {
                readonly title: "Use Proxy";
                readonly ok: true;
            };
            readonly 306: {
                readonly title: "Switch Proxy";
                readonly ok: true;
            };
            readonly 307: {
                readonly title: "Temporary Redirect";
                readonly ok: true;
            };
            readonly 308: {
                readonly title: "Permanent Redirect";
                readonly ok: true;
            };
            readonly 400: {
                readonly title: "Bad Request";
                readonly ok: false;
            };
            readonly 401: {
                readonly title: "Unauthorized";
                readonly ok: false;
            };
            readonly 402: {
                readonly title: "Payment Required";
                readonly ok: false;
            };
            readonly 403: {
                readonly title: "Forbidden";
                readonly ok: false;
            };
            readonly 404: {
                readonly title: "Not Found";
                readonly ok: false;
            };
            readonly 405: {
                readonly title: "Method Not Allowed";
                readonly ok: false;
            };
            readonly 406: {
                readonly title: "Not Acceptable";
                readonly ok: false;
            };
            readonly 407: {
                readonly title: "Proxy Authentication Required";
                readonly ok: false;
            };
            readonly 408: {
                readonly title: "Request Timeout";
                readonly ok: false;
            };
            readonly 409: {
                readonly title: "Conflict";
                readonly ok: false;
            };
            readonly 410: {
                readonly title: "Gone";
                readonly ok: false;
            };
            readonly 411: {
                readonly title: "Length Required";
                readonly ok: false;
            };
            readonly 412: {
                readonly title: "Precondition Failed";
                readonly ok: false;
            };
            readonly 413: {
                readonly title: "Payload Too Large";
                readonly ok: false;
            };
            readonly 414: {
                readonly title: "URI Too Long";
                readonly ok: false;
            };
            readonly 415: {
                readonly title: "Unsupported Media Type";
                readonly ok: false;
            };
            readonly 416: {
                readonly title: "Range Not Satisfiable";
                readonly ok: false;
            };
            readonly 417: {
                readonly title: "Expectation Failed";
                readonly ok: false;
            };
            readonly 418: {
                readonly title: "I'm a teapot";
                readonly ok: false;
            };
            readonly 421: {
                readonly title: "Misdirected Request";
                readonly ok: false;
            };
            readonly 422: {
                readonly title: "Unprocessable Entity";
                readonly ok: false;
            };
            readonly 423: {
                readonly title: "Locked";
                readonly ok: false;
            };
            readonly 424: {
                readonly title: "Failed Dependency";
                readonly ok: false;
            };
            readonly 425: {
                readonly title: "Too Early";
                readonly ok: false;
            };
            readonly 426: {
                readonly title: "Upgrade Required";
                readonly ok: false;
            };
            readonly 428: {
                readonly title: "Precondition Required";
                readonly ok: false;
            };
            readonly 429: {
                readonly title: "Too Many Requests";
                readonly ok: false;
            };
            readonly 431: {
                readonly title: "Request Header Fields Too Large";
                readonly ok: false;
            };
            readonly 451: {
                readonly title: "Unavailable For Legal Reasons";
                readonly ok: false;
            };
            readonly 500: {
                readonly title: "Internal Server Error";
                readonly ok: false;
            };
            readonly 501: {
                readonly title: "Not Implemented";
                readonly ok: false;
            };
            readonly 502: {
                readonly title: "Bad Gateway";
                readonly ok: false;
            };
            readonly 503: {
                readonly title: "Service Unavailable";
                readonly ok: false;
            };
            readonly 504: {
                readonly title: "Gateway Timeout";
                readonly ok: false;
            };
            readonly 505: {
                readonly title: "HTTP Version Not Supported";
                readonly ok: false;
            };
            readonly 506: {
                readonly title: "Variant Also Negotiates";
                readonly ok: false;
            };
            readonly 507: {
                readonly title: "Insufficient Storage";
                readonly ok: false;
            };
            readonly 508: {
                readonly title: "Loop Detected";
                readonly ok: false;
            };
            readonly 510: {
                readonly title: "Not Extended";
                readonly ok: false;
            };
            readonly 511: {
                readonly title: "Network Authentication Required";
                readonly ok: false;
            };
            readonly 440: {
                readonly title: "Login Timeout";
                readonly ok: false;
            };
            readonly 449: {
                readonly title: "Retry With";
                readonly ok: false;
            };
            readonly 444: {
                readonly title: "No Response";
                readonly ok: false;
            };
            readonly 494: {
                readonly title: "Request header too large";
                readonly ok: false;
            };
            readonly 495: {
                readonly title: "SSL Certificate Error";
                readonly ok: false;
            };
            readonly 496: {
                readonly title: "SSL Certificate Required";
                readonly ok: false;
            };
            readonly 497: {
                readonly title: "HTTP Request Sent to HTTPS Port";
                readonly ok: false;
            };
            readonly 499: {
                readonly title: "Client Closed Request";
                readonly ok: false;
            };
            readonly 520: {
                readonly title: "Web Server Returned an Unknown Error";
                readonly ok: false;
            };
            readonly 521: {
                readonly title: "Web Server is Down";
                readonly ok: false;
            };
            readonly 522: {
                readonly title: "Connection Timed Out";
                readonly ok: false;
            };
            readonly 523: {
                readonly title: "Origin Is Unreachable";
                readonly ok: false;
            };
            readonly 524: {
                readonly title: "A Timeout Occurred";
                readonly ok: false;
            };
            readonly 525: {
                readonly title: "SSL Handshake Failed";
                readonly ok: false;
            };
            readonly 526: {
                readonly title: "Invalid SSL Certificate";
                readonly ok: false;
            };
            readonly 631: {
                readonly title: "Non-Standard Information";
                readonly ok: true;
            };
            readonly 632: {
                readonly title: "Non-Standard Success";
                readonly ok: true;
            };
            readonly 633: {
                readonly title: "Non-Standard Redirect";
                readonly ok: true;
            };
            readonly 634: {
                readonly title: "Non-Standard Client Error";
                readonly ok: false;
            };
            readonly 635: {
                readonly title: "Non-Standard Server Error";
                readonly ok: false;
            };
            readonly 600: {
                readonly title: "Not a Response";
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
            detail?: Handlers.Types.Response<Status, DataType>["detail"];
        }): Handlers.Types.Response<Status, DataType>;
    }
}
export default Handlers;
