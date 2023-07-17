import { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin'

const featureFlagsPlugin: FastifyPluginCallback = (app, opts, done) => {
  // TODO check if mongodb has been configured
  // TODO get feature flags from mongodb
  // TODO add getFeatureFlags and reloadFeatureFlags to fastify instance
  app.decorate('featureFlags', {})
  done();
}

export default fp(featureFlagsPlugin)
