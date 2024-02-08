const Fastify = require("fastify");
import path from "path";
import fastifyStatic from "@fastify/static";
import { routeHandler } from "./handlers/route.handler";
import { oprConfig } from "./config/oprConfig";
const {Eta} = require("eta");

const fastify = Fastify({
  logger: true,
  caseSensitive: false,
  ignoreTrailingSlash: true,
  trustProxy: true
})

export const eta = new Eta({ views: path.join(__dirname, "layout") })


const STATIC_FILE_MAX_AGE = 31557600000
const staticPaths = [path.join(__dirname, 'public'), path.join(__dirname, 'public_asset')]

fastify.register(fastifyStatic, {
  root: staticPaths,
  maxAge: STATIC_FILE_MAX_AGE
})

fastify.register(routeHandler)

fastify.get('/ping', async (request:any, reply:any) => {
  return 'pong\n'
})

fastify.listen({ port: oprConfig.PORT, host: '0.0.0.0' }, (err:any, address:any) => {
  console.log(`Server Connected http://localhost:${oprConfig.PORT}`);
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})


