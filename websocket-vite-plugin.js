import injectSocketIO from "./socketiohandler";

export const webSocketServerPlugin = {
  name:'websocket-vite-plugin',
  configureServer(server) {
    injectSocketIO(server.httpServer);
  }
}
