import autoLoad from '@fastify/autoload'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fastify from 'fastify'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default async function build() {
  const app = fastify({ logger: { level: process.env.LOG_LEVEL || 'info' } })

  await app.register(fastifySwagger)
  await app.register(fastifySwaggerUI, {
    routePrefix: '/documentation',
  })
  
  app.register(autoLoad, {
    dir: join(__dirname, 'plugins')
  })
  
  app.register(autoLoad, {
    dir: join(__dirname, 'routes'),
  })

  return app
}

