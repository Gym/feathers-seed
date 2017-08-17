import * as commonHooks from 'feathers-hooks-common';
import * as authentication from 'feathers-authentication';
import { restrictToOwner } from 'feathers-authentication-hooks';
import * as localStrategy from 'feathers-authentication-local';

import { AppHooks } from '../../core/models';

const authenticate = authentication.hooks.authenticate;
const hashPassword = localStrategy.hooks.hashPassword;

const restrict = [
  authenticate('jwt'),
  restrictToOwner({
    idField: '_id',
    ownerField: '_id'
  })
];

class UserHooks extends AppHooks {
  before = {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ ...restrict ],
    create: [ hashPassword() ],
    update: [ ...restrict, hashPassword() ],
    patch: [ ...restrict, hashPassword() ],
    remove: [ ...restrict ]
  };

  after = {
    all: [
      commonHooks.when(
        (hook: any) => hook.params.provider,
        commonHooks.discard('password')
      )
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  };
}

export default new UserHooks();
