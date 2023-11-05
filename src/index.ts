import { FromSchema } from 'json-schema-to-ts';
import build from '../builder/build-service.js';

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

type ConfigSchema = FromSchema<typeof schema>;

export default build<ConfigSchema>(schema, async (fastify) => {
  console.log(fastify.config.PORT);
});
