import Node from './Node';

class LinkedList<T> {
  private _head: Node<T> | null = null;

  private _tail: Node<T> | null = null;

  private _count = 0;

  get head(): Node<T> | null {
    return this._head;
  }

  get tail(): Node<T> | null {
    return this._tail;
  }

  get count(): number {
    return this._count;
  }

  /**
   * Adds node instance to top of list
   *
   * @param node Instance of Node
   */
  unshift(node: Node<T>): number {
    if (this._count === 0) {
      this._head = node;
      this._tail = node;
    } else {
      const tmp = this.head;
      this._head = node;
      this._head.next = tmp;
      if (tmp) {
        tmp.previous = this._head;
      }
    }
    this._count += 1;
    return this.count;
  }

  /**
   * Removes node instance from top of list
   */
  shift(): number {
    if (this.count !== 0) {
      if (this.count === 1) {
        this._head = null;
        this._tail = null;
      } else if (this.head) {
        const tmp = this.head;
        this._head = this.head.next;
        tmp.next = null;

        if (this._head) {
          this._head.previous = null;
        }
      }
      this._count -= 1;
    }
    return this.count;
  }

  /**
   * Adds node instance to bottom of list
   *
   * @param node Instance of Node
   */
  push(node: Node<T>): number {
    if (this._count === 0) {
      this._head = node;
      this._count += 1;
    } else if (this.tail) {
      this.tail.next = node;
      // eslint-disable-next-line no-param-reassign
      node.previous = this.tail;
    }

    this._tail = node;
    this._count += 1;

    return this.count;
  }

  /**
   * Removes node instance from bottom of list
   */
  pop(): number {
    if (this.count !== 0) {
      if (this.count === 1) {
        this._head = null;
        this._tail = null;
      } else if (this.tail) {
        const tmp = this.tail;

        this._tail = this.tail.previous;

        if (this.tail) {
          this.tail.next = null;
        }

        if (tmp) {
          tmp.previous = null;
          tmp.next = null;
        }
      }
      this._count -= 1;
    }
    return this.count;
  }
}

export default LinkedList;
