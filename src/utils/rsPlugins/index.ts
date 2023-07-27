import { FastifyInstance, FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';
import auth, { AuthPlugin } from './auth/index.js';
import { rsPluginRegister } from './plugin.js';

export type IsRsPluginEnabled<T extends string> =
  FastifyInstance extends {
    rsPluginsConfig: {
      [K in T]: { enabled: true }
    }
  }
  ? true
  : FastifyInstance extends {
    rsPluginsConfig: {
      [K in T]: { enabled: false }
    }
  }
  ? false
  : unknown;

export type RsPluginEnabled<T> = T & { enabled: true };

export type RsPluginDisabled = { enabled: false };

export type RsPlugin<Name extends string, T> =
    IsRsPluginEnabled<Name> extends true
  ? RsPluginEnabled<T>
  : IsRsPluginEnabled<Name> extends false
  ? RsPluginDisabled
  : RsPluginEnabled<T> | RsPluginDisabled;

declare module 'fastify' {
  interface FastifyInstance {
    rs: {
      auth: RsPlugin<'auth', AuthPlugin>;
      featureFlags: RsPlugin<'featureFlags', {}>;
      metrics: RsPlugin<'metrics', {}>;
      prisma: RsPlugin<'prisma', {}>;
    }
  }
}

const rsPlugins: FastifyPluginCallback = (app, opts, done) => {
  app.decorate('rs', {} as any)
  app.register(rsPluginRegister(auth, { name: 'auth' }));
  done();
}

export default fp(rsPlugins);


