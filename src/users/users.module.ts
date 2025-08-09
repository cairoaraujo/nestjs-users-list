import { randomUUID } from 'crypto';
import { UserSchema } from './interfaces/users.interface';

export class User {
  props: UserSchema;
  _id: string;

  constructor(props: UserSchema, id?: string) {
    this.props = props;
    this._id = id || randomUUID();
  }
  get id(): string {
    return this._id;
  }
}
