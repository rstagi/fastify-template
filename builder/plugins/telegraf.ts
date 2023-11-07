import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { Telegraf } from "telegraf";

declare module "fastify" {
  interface FastifyInstance {
    bot: Telegraf;
  }
}

export type TelegrafPluginOptions = {
  token: string;
  path: string;
};

export default fastifyPlugin(
  (
    fastify: FastifyInstance,
    options: TelegrafPluginOptions,
    next: () => void,
  ) => {
    const token = options.token;
    const bot = new Telegraf(token);
    fastify.decorate("bot", bot);
    fastify.post(options.path, (req, res) => {
      bot.handleUpdate(req.body as any, res.raw);
    });

    next();
  },
);
