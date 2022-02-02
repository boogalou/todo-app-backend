import { compare, hash } from 'bcryptjs';

export class UserEntity {
  private _password: string;

  constructor(
    private readonly _email: string,
    private readonly _name: string,
    passwordHash?: string,
    private readonly _isActivated?: boolean,
    private readonly _activationLink? : string,
  ) {
    if (passwordHash) {
      this._password = passwordHash;
    }
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

  get activationLink(): string {
    return this._activationLink!;
  }

  get isActivated(): boolean {
    return this._isActivated!;
  }

  public async setPassword(pass: string, salt: number): Promise<void> {
    this._password = await hash(pass, salt);
  }

  public async comparePassword(pass: string): Promise<boolean> {
    return compare(pass, this._password);
  }
}
