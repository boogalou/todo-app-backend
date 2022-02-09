import { IUserModel } from '../user/user.model.interface';


export class TodoEntity {
  private _id: string;
  private _user: IUserModel;


  constructor(
    private _title: string,
    private _completed: boolean,
  ) {


  }

  get id(): string {
    return this._id;
  }

  get user(): IUserModel {
    return this._user;
  }

  get title(): string {
    return this._title;
  }

  get completed(): boolean {
    return this._completed;
  }


  set id(id: string) {
    this._id = id;
  }

  set title(title: string) {
    this._title = title;
  }

  set completed(completed: boolean) {
    this._completed = completed;
  }
}
