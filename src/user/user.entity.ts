import { compare, hash } from 'bcryptjs';
import { ITodoModel } from '../todo/types/todo.model.interface';

export class UserEntity {
  private _password: string;
  private _isActivated: boolean;
  private _todos: ITodoModel[];
  private _id: string;
  private _refreshToken: string;

  constructor(
    private readonly _name: string,
    private readonly _email: string,



    passwordHash?: string,

  ) {
    if (passwordHash) {
      this._password = passwordHash;
    }
  }

  get id(): string {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  get name(): string {
    return this._name;
  }

  get password(): string {
    return this._password;
  }

  get todos(): ITodoModel[] {
    return this._todos;
  }

  get isActivated(): boolean {
    return this._isActivated;
  }

  get refreshToken(): string  {
    return this._refreshToken;
  }

  public setActivated() {
    this._isActivated = this._isActivated!
  }

  public async setPassword(pass: string, salt: number): Promise<void> {
    this._password = await hash(pass, salt);
  }

  public async comparePassword(pass: string): Promise<boolean> {
    return compare(pass, this._password);
  }
}
