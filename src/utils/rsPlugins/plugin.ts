import { FastifyInstance, FastifyPluginCallback, FastifyPluginOptions } from "fastify"
import fp, { PluginMetadata } from "fastify-plugin";

export type RsPluginBuilder<T extends FastifyPluginOptions, P> = (app: FastifyInstance, opts: T) => Promise<P>;

export function rsPluginRegister<T extends FastifyPluginOptions, P>(pluginBuilder: RsPluginBuilder<T, P>, options: Required<Pick<PluginMetadata, 'name'>> & PluginMetadata) {
  const { name } = options;
  return fp((async (app, opts) => {
    const pluginsConfig = app.rsPluginsConfig as unknown as Record<string, { enabled: boolean }>;
    const rs = app.rs as any;
    if (name in pluginsConfig  && pluginsConfig[name].enabled === true) {
      rs[name] = {
        ...await pluginBuilder(app, opts),
        enabled: true
      };
    } else {
      rs[name] = { enabled: false };
    }
  }) as FastifyPluginCallback<T>, options)
}
