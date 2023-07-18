import assert from "node:assert";
import { describe, it } from "node:test";
import build from "../../dist/app.js";


describe("Fastify app", () => {
  if (process.env.SKIP_INTEGRATION === "true") {
    it.skip("Skipping because SKIP_INTEGRATION is set to true");
    return;
  }

  it("GET /default/ping should return 'pong'", async () => {
    const app = await build();
    const result = await app.inject('/default/ping');
    assert.strictEqual(result.statusCode, 200);
    assert.strictEqual(result.body, "pong\n");
  });
});
