import assert from "node:assert";
import { test } from "node:test";
import defaultRoutes from "../index.js";
import fastify from "fastify";

test("GET /ping should return 'pong'", async () => {
  const app = await fastify();
  await app.register(defaultRoutes);
  const result = await app.inject('/ping');
  assert.strictEqual(result.statusCode, 200);
  assert.strictEqual(result.body, "pong\n");
});

