class Node<T> {
  previous: Node<T> | null = null;

  next: Node<T> | null = null;

  private _value: T;

  constructor(value: T) {
    this._value = value;
  }

  get value(): T {
    return this._value;
  }
}

export default Node;
