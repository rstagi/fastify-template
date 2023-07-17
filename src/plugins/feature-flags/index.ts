import { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin'

const featureFlagsPlugin: FastifyPluginCallback = (app, opts, done) => {
  app.decorate('featureFlags', {})
  done();
}

export default fp(featureFlagsPlugin)
