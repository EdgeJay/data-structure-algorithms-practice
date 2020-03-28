class Node<T> {
  next: Node<T> | null;

  private _value: T;

  constructor(value: T) {
    this._value = value;
    this.next = null;
  }

  get value(): T {
    return this._value;
  }
}

export default Node;
