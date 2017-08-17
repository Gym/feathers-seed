import * as util from 'gulp-util';
import * as http from 'http';

import Config, { ENV } from './core/config';

import mongoose from './core/mongoose';
import server from './core/server';

class App {
  public server: http.Server;

  public start() {
    mongoose.connect()
      .then(() => {
        this.server = server.listen(normalizePort(Config.PORT));

        this.server.on('error', () => { onError.apply(this); });
        this.server.on('listening', () => { onListening.apply(this); });
      })
      .catch((err) => {
        if (err) {
          console.error(util.colors.red(err.message));
        }
      });
  }
}

function normalizePort(val: number | string): number | string | boolean {
  let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
  if (isNaN(port)) return val;
  else if (port >= 0) return port;
  else return false;
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') throw error;

  let port = this.server.address().port;
  let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(util.colors.red(`${bind} requires elevated privileges`));
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(util.colors.red(`${bind} is already in use`));
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  let addr = this.server.address();

  console.log();
  console.log(util.colors.grey(`Feathers -- ${Config.APP_NAME} (${Config.APP_VERSION})`));
  console.log('--');
  console.log(util.colors.green(`Environment:     ${ENV}`));

  if (typeof addr === 'string') {
    console.log(util.colors.green(`Pipe:            ${addr}`));
  } else {
    console.log(util.colors.green(`Address:         ${addr.address}`));
    console.log(util.colors.green(`Port:            ${addr.port}`));
  }

  console.log(util.colors.green(`Database:        ${mongoose.uri}`));
  console.log();
}

const app: App = new App();
export default app;
