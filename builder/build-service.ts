import fastify, { FastifyInstance } from 'fastify';
import fastifyEnv from '@fastify/env';
import { JSONSchema } from 'json-schema-to-ts';

type DecoratedFastify<T> = FastifyInstance & {
  config: T;
};

export default function build<T extends { PORT: number }>(
  envSchema: JSONSchema,
  buildService: (fastify: DecoratedFastify<T>) => Promise<void>,
) {
  return async (configData?: T) => {
    const app = await registerEnv(fastify(), envSchema, configData);

    await buildService(app);

    app.listen({ host: '0.0.0.0', port: app.config.PORT }, (err) => {
      if (err) {
        app.log.fatal(err);
        process.exit(1);
      }
    });
  };
}

async function registerEnv<T>(
  app: FastifyInstance,
  schema: JSONSchema,
  data?: T,
) {
  await app.register(fastifyEnv, {
    schema,
    data: data ?? process.env,
  });

  return app as unknown as DecoratedFastify<T>;
}
