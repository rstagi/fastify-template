import { FastifyInstance } from "fastify";
import fastifyEnv from "@fastify/env";
import { FromSchema, JSONSchema } from "json-schema-to-ts";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import fastifyUnderPressure from "@fastify/under-pressure";

// @ts-ignore
import type { FastifyMongodbOptions } from "@fastify/mongodb";

type DecoratedFastify<
  Plugins extends PluginsConfig,
  Config,
> = FastifyInstance & {
  plugins?: Plugins;
  config: Config;
};

type ConfigFromSchema<Schema extends JSONSchema | undefined> =
  Schema extends JSONSchema ? FromSchema<Schema> : any; // eslint-disable-line @typescript-eslint/no-explicit-any

type PluginsConfig = {
  mongodb?: false | FastifyMongodbOptions;
};

export default function build<
  Plugins extends PluginsConfig,
  ConfigSchema extends JSONSchema | undefined,
>(
  config: {
    plugins?: Plugins;
    envSchema: ConfigSchema;
  },
  buildService: (
    fastify: DecoratedFastify<Plugins, ConfigFromSchema<ConfigSchema>>,
  ) => Promise<void>,
) {
  const { plugins: { mongodb = false } = {} } = config;
  return async (configData?: ConfigFromSchema<ConfigSchema>) => {
    const fastify = await registerEnv(
      require("fastify")({
        logger: { level: configData?.LOG_LEVEL ?? "info" },
      }),
      config.envSchema,
      configData,
    );

    fastify.register(fastifySwagger); // TODO: make it customizable
    fastify.register(fastifySwaggerUI); // TODO: make it customizable
    fastify.register(fastifyUnderPressure); // TODO: make it customizable

    if (mongodb) {
      fastify.register(require("@fastify/mongodb"), mongodb);
    }

    await buildService(fastify);
    await fastify.ready();

    fastify.listen(
      { host: "0.0.0.0", port: fastify.config.PORT || 3000 },
      (err) => {
        if (err) {
          fastify.log.fatal(err);
          process.exit(1);
        }
      },
    );
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
