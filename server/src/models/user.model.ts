import {Entity, model, property} from '@loopback/repository';
const jwt = require('jsonwebtoken');
@model()
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    // required: true,
  })
  _id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  clinetsAdded?: object[];

  @property({
    type: 'array',
    itemType: 'date',
  })
  attendance?: string[];

  @property({
    type: 'array',
    itemType: 'object',
  })
  storeAction?: object[];

  constructor(data?: Partial<User>) {
    super(data);
  }
  generateAuthToken() {
    const token = jwt.sign(
      {_id: this._id, username: this.name},
      'TheVerySecurePrivateKey',
    );
    return token;
  }
}
