export enum Comparison {
  LESSER_THAN = -1,
  EQUAL,
  GREATER_THAN,
}

export enum AvailableSlot {
  NONE,
  LEFT,
  RIGHT,
  BOTH,
}

class Node<T = number> {
  private _value: T;

  left: Node<T> | null = null;

  right: Node<T> | null = null;

  constructor(value: T) {
    this._value = value;
  }

  get value(): T {
    return this._value;
  }

  compare(node: Node<T>): Comparison {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lhs = this.value as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rhs = node.value as any;

    if (lhs - rhs < 0) {
      return Comparison.GREATER_THAN;
    }
    if (lhs - rhs > 0) {
      return Comparison.LESSER_THAN;
    }
    return Comparison.EQUAL;
  }

  availableSlots(): AvailableSlot {
    if (this.isTerminalNode()) {
      return AvailableSlot.BOTH;
    }

    if (this.left === null) {
      return AvailableSlot.LEFT;
    }

    if (this.right === null) {
      return AvailableSlot.RIGHT;
    }

    return AvailableSlot.NONE;
  }

  isTerminalNode(): boolean {
    return this.left === null && this.right === null;
  }

  addNodeTo(node: Node<T> | null, slot: AvailableSlot): void {
    if (slot === AvailableSlot.LEFT) {
      this.left = node;
    } else if (slot === AvailableSlot.RIGHT) {
      this.right = node;
    }
  }

  removeChildNodeAt(slot: AvailableSlot): void {
    if (slot === AvailableSlot.LEFT) {
      this.left = null;
    } else if (slot === AvailableSlot.RIGHT) {
      this.right = null;
    }
  }
}

export default Node;
