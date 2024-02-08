import { FastifyInstance, FastifyPluginAsync, onRequestAsyncHookHandler, } from 'fastify';
import { configRoutes } from '../config/route.config';
import { IOptionsRoute } from '../interfaces/url.interface';

export const routeHandler: FastifyPluginAsync = async (
  app: FastifyInstance
) => {
  configRoutes.forEach((config) => {
    registerRoute(config.ROUTE, config.URL);
  });

  async function registerRoute(routeName: string, routeUrl: string) {
    const routeConfig = await import(`../routes${routeName}.route`);
    const option = { route: routeUrl, routeConfig: routeConfig.default };
    createRoute(app, option);
  }

  const onRequest: onRequestAsyncHookHandler = async (req, res) => {
    // res.helmet({
    //   "contentSecurityPolicy": {
    //     "directives": {
    //       "script-src": [
    //         "'self'",
    //         "'unsafe-inline'"
    //       ],
    //       "script-src-attr": ["'unsafe-inline'"],
    //       "img-src": [
    //         "'self'"
    //       ],
    //       "style-src": [
    //         "'self'",
    //         "'unsafe-inline'"
    //       ],
    //       "font-src": [
    //         "'self'"
    //       ],
    //       "frame-src": [],
    //       "connect-src": [
    //         "'self'"
    //       ],
    //       "upgradeInsecureRequests": []
    //     }
    //   }
    // })
    res.header('X-XSS-Protection', '1; mode=block')
  }

  const createRouteOptions = (options: IOptionsRoute) => ({
    url: options.route,
    ...options.routeConfig,
    onRequest: onRequest
  });

  const createRoute = async (app: FastifyInstance, option: IOptionsRoute) => {
    const routeOptions = createRouteOptions(option);
    app.route(routeOptions);
  };
};
