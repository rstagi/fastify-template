import assert from "node:assert";
import { test } from "node:test";
import build from "../../dist/app.js";

test("GET /default/ping should return 'pong'", async () => {
  const app = await build({
    LOG_LEVEL: "silent",
  });
  const result = await app.inject('/default/ping');
  assert.strictEqual(result.statusCode, 200);
  assert.strictEqual(result.body, "pong\n");
});
