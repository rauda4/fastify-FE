import { HTTPMethods } from "fastify";
import { AsyncFunction } from "fastify/types/instance";


export interface IOptionsRoute {
    route : string,
    routeConfig : { method : HTTPMethods , handler : AsyncFunction}
  }

  export interface IGrayLogObject {
    log: (msg: string, msgfull: string, loggerinfodata: any) => void;
    toUnicode: (str: string) => string;
  }
  
  export interface ILogObject {
    logging: (
      msg: string,
      msgfull: string,
      logcustomdata: any,
      optional?: boolean
    ) => void;
    exLogging: (function_name: string, ex: any) => void;
    debugLogging: (msg: string, msgfull: string, logcustomdata: any) => void;
    strippinglongstring: (data: any, k: any) => void;
  }