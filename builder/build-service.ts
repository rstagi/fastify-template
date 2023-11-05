import fastify, { FastifyInstance } from "fastify";
import fastifyEnv from "@fastify/env";
import { FromSchema, JSONSchema } from "json-schema-to-ts";

type DecoratedFastify<T> = FastifyInstance & {
  config: T;
};

type ConfigFromSchema<Schema extends JSONSchema | undefined> =
  Schema extends JSONSchema ? FromSchema<Schema> : any; // eslint-disable-line @typescript-eslint/no-explicit-any

export default function build<T extends JSONSchema | undefined>(
  envSchema: T,
  buildService: (
    fastify: DecoratedFastify<ConfigFromSchema<T>>,
  ) => Promise<void>,
) {
  return async (configData?: ConfigFromSchema<T>) => {
    const app = await registerEnv(fastify(), envSchema, configData);

    await buildService(app);

    app.listen({ host: "0.0.0.0", port: app.config.PORT || 3000 }, (err) => {
      if (err) {
        app.log.fatal(err);
        process.exit(1);
      }
    });
  };
}

async function registerEnv<T>(
  app: FastifyInstance,
  schema: JSONSchema | undefined,
  data?: T,
) {
  await app.register(fastifyEnv, {
    schema,
    data: data ?? process.env,
  });

  return app as unknown as DecoratedFastify<T>; // FIXME: there should be a better way to do this (assertion function is not working)
}
