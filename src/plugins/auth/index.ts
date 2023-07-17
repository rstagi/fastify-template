import { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin'

const authPlugin: FastifyPluginCallback = (app, opts, done) => {
  // TODO init firebase auth 
  // TODO decorate request with user information
  // TODO provide utilities to interact with the user
  done();
}

export default fp(authPlugin)
