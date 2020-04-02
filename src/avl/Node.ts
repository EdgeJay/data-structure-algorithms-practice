class Node<T> {
  left?: Node<T>;

  right?: Node<T>;

  parent?: Node<T>;

  private _value: T;

  constructor(value: T) {
    this._value = value;
  }

  get value(): T {
    return this._value;
  }
}

export default Node;
