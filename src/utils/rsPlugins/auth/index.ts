import { RsPluginBuilder } from '../plugin.js';

export interface AuthPlugin {
  someFunc: () => void;
}

const authPlugin: RsPluginBuilder<{}, AuthPlugin> = async (app, opts) => {
  // TODO init firebase auth 
  // TODO decorate request with user information
  // TODO provide utilities to interact with the user
  return {
    someFunc: () => {}
  }
}

export default authPlugin;
