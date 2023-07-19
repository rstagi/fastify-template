import { FastifyPluginCallback } from "fastify"
import fp from 'fastify-plugin'
import { statSync } from "fs";
import { glob } from 'glob';

type AutoloadOptions = {
  path: string;
}

const autoload: FastifyPluginCallback<AutoloadOptions> = async (app, opts, done) => {
  const matches = await glob(`${opts.path}/*`);
  for (const match of matches) {
    if (statSync(match).isFile()) continue;

    const fullPath = `${match}/index.js`
    const dir = match.split('/').pop()
    const prefix = `/${dir}`

    await app.register((await import(fullPath)).default, { prefix })
    
    app.log.info(`Registered ${fullPath} with prefix ${prefix}`)
  }
}

export default fp(autoload)
