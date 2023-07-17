import { FastifyPluginCallback } from "fastify"

const defaultRoutes: FastifyPluginCallback = (app, opts, done) => {
  app.get('/ping', async () => {
    return 'pong\n'
  });
  done();
}

export default defaultRoutes
