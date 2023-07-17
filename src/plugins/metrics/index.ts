import { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin'

const metricsPlugin: FastifyPluginCallback = (app, opts, done) => {
  // TODO init the prometheus client and expose standard metrics
  // TODO provide utilities to the other plugins to add their own metrics 
  done();
}

export default fp(metricsPlugin)
