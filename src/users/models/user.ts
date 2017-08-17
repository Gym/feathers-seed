import * as _ from 'lodash';
import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  firstName: string;
  lastName: string;
  phone?: string;
  // providers: any[];
  createdAt?: Date;
  modifiedAt?: Date;
}

class User {
  static get schema() {
    let schema = new mongoose.Schema({
      firstName: {
        type: String,
        trim: true,
        default: '',
        // validate: [isValidLocalStrategyProperty, 'Please fill in your first name']
      },
      lastName: {
        type: String,
        trim: true,
        default: '',
        // validate: [isValidLocalStrategyProperty, 'Please fill in your last name']
      },
      displayName: {
        type: String,
        trim: true
      },
      facebookId: { type: String },
      facebook: { type: mongoose.Schema.Types.Mixed },
      // emails: [EmailSchema],
      username: {
        type: String,
        // unique: 'Username already exists',
        // required: 'Please fill in a username',
        trim: true
      },
      password: {
        type: String,
        default: '',
        // validate: [isValidLocalStrategyPassword, 'Password should be longer']
      },
      salt: String,
      phone: {
        type: String,
        trim: true
      },
      // providers: {
      //   type: [Provider]
      // },
      createdAt: {
        type: Date,
        default: Date.now,
        required: false
      },
      modifiedAt: {
        type: Date,
        required: false
      }
    });

  //   schema.virtual('primaryEmail')
  // .get(function () {
  //   if (this.emails.length) {
  //     return _.result(_.find(this.emails, function (email) {
  //       return email.isPrimary;
  //     }), 'address');
  //   }

  //   return;
  // });

    schema.pre('save', function (next) {
      if (this._doc) {
        let doc = <IUser>this._doc;
        let now = new Date();

        doc.modifiedAt = now;
      }

      next();

      return this;
    });

    schema.set('toJSON', {
        virtuals: true
    });

    return schema;
  }
}

/**
 * A Validation function for local strategy properties
 */
function isValidLocalStrategyProperty(property: string): boolean {
  return (!!property.length || (!_.isEmpty(this.providers) && !this.updated));
}

/**
 * A Validation function for local strategy password
 */
function isValidLocalStrategyPassword(password: string): boolean {
  return ((password && password.length > 6) || !_.isEmpty(this.providers));
}

const model = mongoose.model<IUser>('user', User.schema, 'users', true);

export default model;
