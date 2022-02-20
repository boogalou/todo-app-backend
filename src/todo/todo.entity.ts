export class TodoEntity {
  private _id: string;
  private _createdAt: Date;
  constructor(
    private _title: string,
    private _completed: boolean,
    private _userId: string,
  ) {
  }

  get id(): string {
    return this._id;
  }

  get userId(): string {
    return this._userId;
  }

  get title(): string {
    return this._title;
  }

  get completed(): boolean {
    return this._completed;
  }

  get createdAt(): Date {
    return this._createdAt;
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

  set createdAt(createdAt: Date) {
    this._createdAt = createdAt
  }
}
