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
      } else {
        // find out node that has next pointing to this.tail
        let node = this.head;
        while (node && node.next !== this.tail) {
          node = node?.next;
        }
        if (node) {
          node.next = null;
          this._tail = node;
        }
      }
      this._count -= 1;
    }
    return this.count;
  }
}

export default LinkedList;
