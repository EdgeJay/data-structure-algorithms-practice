import LinkedList from '../doublyLinkedList/LinkedList';
import Node from '../doublyLinkedList/Node';

class Stack<T> {
  private _list: LinkedList<T> = new LinkedList();

  get list(): LinkedList<T> {
    return this._list;
  }

  push(node: Node<T>): number {
    return this._list.push(node);
  }

  pop(): number {
    return this._list.pop();
  }

  count(): number {
    return this._list.count;
  }
}

export default Stack;
