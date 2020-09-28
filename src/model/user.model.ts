class User {
  private _id: number;
  private _name: string;

  constructor(id: number, name: string) {
    this._id = id;
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }
}

export default User;
