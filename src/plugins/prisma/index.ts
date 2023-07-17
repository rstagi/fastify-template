import { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin'

const prismaPlugin: FastifyPluginCallback = (app, opts, done) => {
  // TODO init mongodb and prisma 
  // TODO provide utilities for the other plugins to interact with the schemas
  done();
}

export default fp(prismaPlugin)
