import * as util from 'gulp-util';
import mongoose = require('mongoose');

import Config from './config';

class Mongoose {
  public client = mongoose;
  public uri: string = `mongodb://${Config.db.host}:${Config.db.port}/${Config.db.database}`;

  public connect() {
    mongoose.set('debug', Config.DEBUG);
    mongoose.Promise = typeof Config.db.promise === 'string' ? eval(Config.db.promise) : Config.db.promise;

    return mongoose.connect(this.uri, Config.db.options)
      .catch((err) => {
        if (err) {
          console.error(util.colors.red(err.message));
        }
      });
  }

  public disconnect() {
    return mongoose.disconnect()
      .catch((err) => {
        console.info(util.colors.yellow('Disconnected from MongoDB.'));
      });
  }
}

const service: Mongoose = new Mongoose();
export default service;
