import autoLoad from '@fastify/autoload'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fastify from 'fastify'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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

app.listen({ host: "0.0.0.0", port: 8080 }, (err, address) => {
  if (err) {
    app.log.fatal(err)
    process.exit(1)
  }
})
