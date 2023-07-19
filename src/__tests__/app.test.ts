import assert from "node:assert";
import { test } from "node:test";
import build from "../app.js";

test("GET /default/ping should return 'pong'", async () => {
  const app = await build({
    LOG_LEVEL: "info",
  });
  const result = await app.inject({
    method: 'GET',
    path: '/default/ping'
  });
  assert.strictEqual(result.statusCode, 200);
  assert.strictEqual(result.body, "pong\n");
});
