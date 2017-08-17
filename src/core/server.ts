import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as favicon from 'serve-favicon';
import * as feathers from 'feathers';
import * as helmet from 'helmet';
import * as methodOverride from 'method-override';
import * as morgan from 'morgan';
import { join, resolve } from 'path';

import mongoose from './mongoose';

import { CORE_HOOKS } from './hooks';

import Config from './config';

const SIX_MONTHS: number = 15778476000;

class Server {
  public app: feathers.Application;

  constructor() {
    this.app = feathers();

    this.init();
  }

  private init(): void {
    this.app.set('mongooseClient', mongoose.client);

    this.app.configure(require('feathers-hooks')());
    this.app.configure(require('feathers-rest')());
    this.app.configure(require('feathers-socketio')());

    this.security();
    this.middleware();
  }

  private middleware(): void {
    this.app.use(compression({
      filter: (req: any, res: any) => {
        return (/json|text|javascript|css|font|svg/).test(res.getHeader('Content-Type'));
      },
      level: 9
    }));

    this.app.use(cors());

    if (Config.DEBUG) {
      this.app.use(morgan('dev'));
    }

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(methodOverride());
    this.app.use(favicon(join(Config.PUBLIC_DIR, 'favicon.ico')));

    // this.app.use(swagger());
    this.app.use('/', feathers.static(Config.PUBLIC_DIR));

    for (let service of Config.globFiles(Config.services)) {
      require(resolve(service)).default(this.app);
    }

    for (let hooks of CORE_HOOKS) {
      this.app.hooks(hooks);
    }

    // Configure a middleware for 404s and the error handler
    this.app.use(require('feathers-errors/not-found')());
    this.app.use(require('feathers-errors/handler')());
  }

  private security(): void {
    // Use helmet to secure headers
    this.app.use(helmet.frameguard());
    this.app.use(helmet.xssFilter());
    this.app.use(helmet.noSniff());
    this.app.use(helmet.ieNoOpen());
    this.app.use(helmet.hsts({
      maxAge: SIX_MONTHS,
      includeSubdomains: true,
      force: true
    }));

    this.app.disable('x-powered-by');
  }
}

export default new Server().app;
