import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'

import fastify from 'fastify'

import autoload from './utils/autoload.js'

import { fileURLToPath } from 'url'
import { join, dirname } from 'path'

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
  
  await app.register(autoload, { path: join(__dirname, 'plugins') })
  await app.register(autoload, { path: join(__dirname, 'routes') })

  return app
}
