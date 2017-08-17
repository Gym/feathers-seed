import * as createService from 'feathers-mongoose';
import { User } from '../models';
import { USER_FILTERS, USER_HOOKS } from '../';
import Config from '../../core/config';

const authentication = require('feathers-authentication');
const jwt = require('feathers-authentication-jwt');
const local = require('feathers-authentication-local');
const oauth2 = require('feathers-authentication-oauth2');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');

export default class AuthenticationService {
  constructor(app: any) {
    const config = Config.get('authentication');

    // Set up authentication with the secret
    app.configure(authentication(config));
    app.configure(jwt());
    app.configure(local(config.local));

    app.configure(oauth2(Object.assign({
      name: 'google',
      Strategy: GoogleStrategy
    }, config.google)));

    app.configure(oauth2(Object.assign({
      name: 'facebook',
      Strategy: FacebookStrategy
    }, config.facebook)));

    // The `authentication` service is used to create a JWT.
    // The before `create` hook registers strategies that can be used
    // to create a new valid JWT (e.g. local or oauth2)
    const service = app.service('authentication');
    
    service.hooks({
      before: {
        create: [
          authentication.hooks.authenticate(config.strategies)
        ],
        remove: [
          authentication.hooks.authenticate('jwt')
        ]
      }
    });
  }
}
