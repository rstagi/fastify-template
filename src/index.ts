import build from "../builder/build-service.js";

const schema = {
  type: "object",
  required: ["PORT"],
  properties: {
    PORT: {
      type: "number",
      default: 3000,
    },
  },
} as const;

export default build(schema, async (fastify) => {
  // TODO: add fastify mongodb
  // TODO: add telegram bot utilies (as plugin)
  // TODO: add openai utilities (as plugin)
  console.log(fastify.config.PORT);
});
