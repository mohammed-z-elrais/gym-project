const jwt = require('jsonwebtoken');
import {Strategy as BearerStrategy} from 'passport-http-bearer';
import {Provider, inject, ValueOrPromise} from '@loopback/context';
import {Strategy} from 'passport';
import {
  AuthenticationBindings,
  AuthenticationMetadata,
  UserProfile,
} from '@loopback/authentication';
import {BasicStrategy} from 'passport-http';
import {repository} from '@loopback/repository';
import {UserRepository} from '../repositories';
const md5 = require('md5');

export class MyAuthStrategyProvider implements Provider<Strategy | undefined> {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(AuthenticationBindings.METADATA)
    private metadata: AuthenticationMetadata,
  ) {}

  value(): ValueOrPromise<Strategy | undefined> {
    // The function was not decorated, so we shouldn't attempt authentication
    if (!this.metadata) {
      return undefined;
    }

    const name = this.metadata.strategy;
    if (name === 'BasicStrategy') {
      return new BasicStrategy(this.verify.bind(this));
    } else if (name === 'BearerStrategy') {
      return new BearerStrategy(this.verify2.bind(this));
    } else {
      return Promise.reject(`The strategy ${name} is not available.`);
    }
  }
  verify2(
    token: string,
    cb: (err: Error | null, user?: object | false) => void,
  ) {
    try {
      const user = jwt.verify(token, 'TheVerySecurePrivateKey');
      cb(null, user);
    } catch (ex) {
      cb(null, false);
    }
  }

  async verify(
    username: string,
    password: string,

    cb: (err: Error | null, user?: UserProfile | false) => void,
  ) {
    const user = await this.userRepository.findOne({
      where: {name: username},
    });

    if (user) {
      if (md5(password) === user.password) {
        cb(null, user);
      }
      cb(null, false);
    } else {
      cb(null, false);
    }

    // find user by name & password
    // call cb(null, false) when user not found
    // call cb(null, user) when user is authenticated
  }
}
