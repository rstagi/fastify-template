import build from "../builder/build-service";

const envSchema = {
  type: "object",
  required: ["PORT"],
  properties: {
    PORT: {
      type: "number",
      default: 3000,
    },
  },
} as const;

const run = build(
  {
    plugins: {
      mongodb: false,
      telegraf: false,
    },
    envSchema,
  },
  async (fastify) => {
    // TODO: add telegram bot utilies (as plugin)
    // TODO: add openai utilities (as plugin)
    fastify.log.info(fastify.config.PORT);
  },
);

export default run;

if (require.main === module) {
  run();
}
