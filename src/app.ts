import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'

import fastify from 'fastify'
import plugins from './plugins.js'
import rsPlugins from './utils/rsPlugins/index.js';

declare module 'fastify' {
  interface FastifyInstance {
    rsPluginsConfig: typeof plugins;
  }
}

export default async function build(config: { LOG_LEVEL?: string } = {}) {
  const app = fastify({
    logger: { level: config.LOG_LEVEL || 'info' }
  })

  await app.decorate('rsPluginsConfig', plugins).register(rsPlugins);

  return app
}
