import build from '../builder/build-service';

const schema = {
  type: 'object',
  required: ['PORT'],
  properties: {
    PORT: {
      type: 'number',
      default: 3000,
    },
  },
} as const;

const run = build(schema, async (fastify) => {
  // TODO: add fastify mongodb
  // TODO: add telegram bot utilies (as plugin)
  // TODO: add openai utilities (as plugin)
  fastify.log.info(fastify.config.PORT);
});

export default run;

if (require.main === module) {
  run();
}
