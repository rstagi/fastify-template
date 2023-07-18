import autoLoad from '@fastify/autoload'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fastify from 'fastify'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default async function build(config: { LOG_LEVEL?: string } = {}) {
  const app = fastify({
    logger: { level: config.LOG_LEVEL || 'info' }
  })

  await app.register(fastifySwagger)
  await app.register(fastifySwaggerUI, {
    routePrefix: '/documentation',
  })
  
  await app.register(autoLoad, {
    dir: join(__dirname, 'plugins')
  })
  
  await app.register(autoLoad, {
    dir: join(__dirname, 'routes'),
    ignoreFilter(path) {
      return path.includes('__tests__')
    },
  })

  return app
}
