import { sync } from 'glob';
import { union } from 'lodash';
import * as path from 'path';
import { argv } from 'yargs';

export const ENV = process.env.NODE_ENV || 'development';

export class DbConfig {
  host: string = 'localhost';
  port: number = 27017;
  database: string = 'feathersjs';
  options?: any = {
    useMongoClient: true
  };
  promise?: any = global.Promise;
}

export class Config {
  /**
   * The name of the application as defined in the `package.json`.
   */
  APP_NAME = appName();

  /**
   * The version of the application as defined in the `package.json`.
   */
  APP_VERSION = appVersion();

  ENV: string = ENV;

  DEBUG = argv['debug'] || false;

  PORT = argv['port'] || this.options.port || 8082;

  db: DbConfig = this.options.mongodb || new DbConfig();

  PUBLIC_DIR = this.options.public;

  services: string = './src/*/services/**/*.ts';
  models: string = './src/*/models/**/*.ts';

  constructor(private options: any) { }

  get(key: string): any {
    return this.options[key];
  }

  globFiles(location: string): Array<string> {
    return union([], sync(location));
  }
}

function appName(): string {
  var pkg = require('../../package.json');
  return pkg.name;
}

/**
 * Returns the applications version as defined in the `package.json`.
 * @return {number} The applications version.
 */
function appVersion(): number | string {
  var pkg = require('../../package.json');
  return pkg.version;
}

const configuration: Config = new Config(require('feathers-configuration')()());
export default configuration;
