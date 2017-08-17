import * as createService from 'feathers-mongoose';
import { User } from '../models';
import { USER_FILTERS, USER_HOOKS } from '../';
import Config from '../../core/config';

export default class UsersService {
  constructor(app: any) {
    let options = {
      Model: User,
      paginate: Config.get('paginate')
    };

    app.use('/users', createService(options));

    const service = app.service('users');

    for (let hooks of USER_HOOKS) {
      service.hooks(hooks);
    }

    if (service.filter) {
      service.filter(USER_FILTERS);
    }
  }
}
