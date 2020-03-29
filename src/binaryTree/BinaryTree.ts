import chalk from 'chalk';
import Node, { Comparison, AvailableSlot } from './Node';
import logger from '../common/logger';

class BinaryTree<T> {
  static className = 'BinaryTree';

  private _rootNode: Node<T> | null = null;

  get rootNode(): Node<T> | null {
    return this._rootNode;
  }

  addNodes(values: T[]): void {
    for (let idx = 0; idx < values.length; idx += 1) {
      this.addNode(new Node<T>(values[idx]));
    }
  }

  addNode(node: Node<T>): void {
    if (!this._rootNode) {
      this._rootNode = node;
      logger.info(
        `[${BinaryTree.className}]`,
        chalk.white.bgBlue(`Added Node(${node.value}) as root node`)
      );
      return;
    }

    // traverse and find suitable node to add new node to
    this.attachNode(this._rootNode, node);
  }

  attachNode(parentNode: Node<T>, childNode: Node<T>): void {
    if (parentNode.compare(childNode) === Comparison.LESSER_THAN) {
      if (parentNode.left === null) {
        // eslint-disable-next-line no-param-reassign
        parentNode.left = childNode;
        logger.info(
          `[${BinaryTree.className}]`,
          chalk.white.bgBlue(
            `Added Node(${childNode.value}) as left child node of Node(${parentNode.value})`
          )
        );
      } else {
        this.attachNode(parentNode.left, childNode);
      }
    } else if (parentNode.right === null) {
      // greater than or equal, right node is available
      // eslint-disable-next-line no-param-reassign
      parentNode.right = childNode;
      logger.info(
        `[${BinaryTree.className}]`,
        chalk.white.bgBlue(
          `Added Node(${childNode.value}) as right child node of Node(${parentNode.value})`
        )
      );
    } else {
      // greater than or equal, right node is not available
      this.attachNode(parentNode.right, childNode);
    }
  }

  findParentNode(parentNode: Node<T> | null, value: T): Node<T> | null {
    if (!parentNode) {
      return null;
    }

    if (parentNode.compare(new Node(value)) === Comparison.LESSER_THAN && parentNode.left) {
      if (parentNode.left.compare(new Node(value)) === Comparison.EQUAL) {
        return parentNode;
      }
      return this.findParentNode(parentNode.left, value);
    }

    if (parentNode.right && parentNode.right.compare(new Node(value)) === Comparison.EQUAL) {
      return parentNode;
    }

    return this.findParentNode(parentNode.right, value);
  }

  removeNode(value: T): void {
    if (!this._rootNode) {
      return;
    }

    const parentNode = this.findParentNode(this._rootNode, value);
    if (parentNode) {
      const compareNode = new Node(value);
      let node: Node<T> | null = null;
      let nodePosition = AvailableSlot.NONE;

      if (parentNode.left?.compare(compareNode) === Comparison.EQUAL) {
        node = parentNode.left;
        nodePosition = AvailableSlot.LEFT;
      } else if (parentNode.right?.compare(compareNode) === Comparison.EQUAL) {
        node = parentNode.right;
        nodePosition = AvailableSlot.RIGHT;
      }

      if (node) {
        // Case 0: Is leaf/terminal node
        if (node.isTerminalNode()) {
          logger.info('Case 0');
          parentNode.removeChildNodeAt(nodePosition);
        }

        // Case 1: Removed node has no right child
        // Promote removed node's left child to its place
        if (node.left && node.availableSlots() === AvailableSlot.RIGHT) {
          logger.info('Case 1');
          parentNode.addNodeTo(node.left, nodePosition);
        }

        // Case 2: Removed node's right child has no left child
        if (node.right && node.right.right && node.right.availableSlots() === AvailableSlot.LEFT) {
          logger.info('Case 2');
          parentNode.addNodeTo(node.right, nodePosition);
        }

        // Case 3: Removed node's right child has left child
        if (node.right && node.right.left) {
          logger.info('Case 3');
          parentNode.addNodeTo(node.right.left, nodePosition);
          node.right.left.addNodeTo(node.left, AvailableSlot.LEFT);
          node.right.left.addNodeTo(node.right, AvailableSlot.RIGHT);
        }
      }
    }
  }
}

export default BinaryTree;
