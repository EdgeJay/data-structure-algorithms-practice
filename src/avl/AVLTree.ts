import chalk from 'chalk';
import Node from './Node';
import logger from '../common/logger';

enum Comparison {
  LESSER_THAN = -1,
  EQUAL,
  GREATER_THAN,
}

enum Position {
  ROOT = 0,
  LEFT,
  RIGHT,
}

/**
 * AVL is a subtype of binary search tree, that is self-balanced.
 * Balanced as in the height difference between left and right subtrees
 * should never exceed one.
 */
class AVLTree<T> {
  static className = 'AVLTree';

  private _rootNode?: Node<T>;

  private _count = 0;

  private _orderedNodes?: Node<T>[];

  get rootNode(): Node<T> | undefined {
    return this._rootNode;
  }

  get count(): number {
    return this._count;
  }

  compare(leftNode: Node<T>, rightNode: Node<T>): Comparison {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lhs = leftNode.value as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rhs = rightNode.value as any;

    if (lhs - rhs < 0) {
      return Comparison.GREATER_THAN;
    }
    if (lhs - rhs > 0) {
      return Comparison.LESSER_THAN;
    }
    return Comparison.EQUAL;
  }

  findParentNode(parentNode: Node<T>, childNode: Node<T>): Node<T> {
    const comparison = this.compare(parentNode, childNode);
    if (comparison === Comparison.LESSER_THAN) {
      if (parentNode.left) {
        return this.findParentNode(parentNode.left, childNode);
      }
      return parentNode;
    }
    if (parentNode.right) {
      return this.findParentNode(parentNode.right, childNode);
    }
    return parentNode;
  }

  getNodePosition(parentNode: Node<T> | undefined, childNode: Node<T>): Position {
    let nodePosition = Position.ROOT;

    if (parentNode) {
      if (this.compare(parentNode, childNode) === Comparison.LESSER_THAN) {
        nodePosition = Position.LEFT;
      } else {
        nodePosition = Position.RIGHT;
      }
    }

    return nodePosition;
  }

  traverseNext(node: Node<T> | undefined, accumulator: Node<T>[]): void {
    if (!node || !this.rootNode) {
      return;
    }

    const nodePosition = this.getNodePosition(node.parent, node);

    if (nodePosition === Position.ROOT && node.value !== this.rootNode?.value) {
      return;
    }

    // In in-order traversal, visit left subtree first
    if (node.left) {
      this.traverseNext(node.left, accumulator);
    } else {
      // if left node is null, visit root node (or self),
      accumulator.push(node);
      logger.info(chalk.blueBright('[AVLTree.traverseNext]'), `Pushed in Node(${node.value})`);

      if (node.parent) {
        if (nodePosition === Position.LEFT) {
          accumulator.push(node.parent);
          logger.info(
            chalk.blueBright('[AVLTree.traverseNext]'),
            `Pushed in Node(${node.parent.value})`
          );

          // then visit right subtree
          this.traverseNext(node.parent?.right, accumulator);
        } else if (nodePosition === Position.RIGHT) {
          // then visit parent of parent node
          if (node.parent?.parent && node.parent?.parent?.value === this.rootNode.value) {
            accumulator.push(node.parent.parent);
            logger.info(
              chalk.blueBright('[AVLTree.traverseNext]'),
              `Pushed in Node(${node.parent.parent.value})`
            );
          }
          this.traverseNext(node.parent?.parent?.right, accumulator);
        }
      }
    }
  }

  traverseInOrder(): Node<T>[] {
    if (this._orderedNodes) {
      logger.info(chalk.blueBright('[AVLTree.traverseInOrder] Returning cached ordered nodes...'));
      return this._orderedNodes;
    }

    const nodes: Node<T>[] = [];
    this.traverseNext(this.rootNode, nodes);
    this._orderedNodes = nodes;

    return nodes;
  }

  findNode(value: T): Node<T> | undefined {
    const nodesInOrder = this.traverseInOrder();
    return nodesInOrder.find(node => node.value === value);
  }

  /**
   * Get height of node
   * @param node
   */
  height(node: T | Node<T> | undefined): number {
    if (node === undefined) {
      return -1;
    }

    const childNode =
      typeof node === 'number' ? this.findNode(node) : (node as Node<T> | undefined);

    return Math.max(this.height(childNode?.left), this.height(childNode?.right)) + 1;
  }

  /**
   * Perform left rotation on targetNode
   *
   * @param targetNode Newly inserted node
   * @returns Root node of subtree
   */
  leftRotate(targetNode: Node<T>): Node<T> | undefined {
    if (targetNode.parent && targetNode.parent.parent) {
      const grandParentNode = targetNode.parent.parent;
      const swapRootNode = grandParentNode.value === this.rootNode?.value;
      const tmpNode = grandParentNode.right;
      grandParentNode.right = tmpNode?.left;

      if (tmpNode && tmpNode.left) {
        tmpNode.left.parent = grandParentNode.right;
      }

      if (tmpNode) {
        tmpNode.left = grandParentNode;
        grandParentNode.parent = tmpNode.left;
      }

      if (swapRootNode) {
        this._rootNode = tmpNode;
      }

      return tmpNode;
    }

    return undefined;
  }

  /**
   * Perform left rotation on targetNode
   *
   * @param targetNode Newly inserted node
   * @returns Root node of subtree
   */
  rightRotate(targetNode: Node<T>): Node<T> | undefined {
    if (targetNode.parent && targetNode.parent.parent) {
      const grandParentNode = targetNode.parent.parent;
      const swapRootNode = grandParentNode.value === this.rootNode?.value;
      const tmpNode = grandParentNode.left;
      grandParentNode.left = tmpNode?.right;
      if (tmpNode && tmpNode.right) {
        tmpNode.right.parent = grandParentNode.left;
      }
      if (tmpNode) {
        tmpNode.right = grandParentNode;
        grandParentNode.parent = tmpNode.right;
      }

      if (swapRootNode) {
        this._rootNode = tmpNode;
      }

      return tmpNode;
    }

    return undefined;
  }

  /**
   * Get balance factor of node
   * @param node
   */
  balanceFactor(node: T | Node<T> | undefined): number {
    if (node === undefined) {
      return 0;
    }

    const childNode =
      typeof node === 'number' ? this.findNode(node) : (node as Node<T> | undefined);

    return Math.abs(this.height(childNode?.left) - this.height(childNode?.right));
  }

  reBalanceNodes(node: Node<T>): void {
    if (!node || !node.parent) {
      return;
    }

    // get balance factor of parent node
    const parentNodeBalanceFactor = this.balanceFactor(node.parent);
    if (parentNodeBalanceFactor > 1) {
      logger.info(
        chalk.white.bgRed('[AVLTree.reBalanceNodes]'),
        chalk.red(`Parent node of Node(${node.value}) needs re-balancing!`),
        `
          node position: ${this.getNodePosition(node.parent, node)}
          parent node position: ${this.getNodePosition(node.parent.parent, node.parent)}
        `
      );

      // LL (single left) rotation if node is inserted into right subtree of right subtree
      if (
        this.getNodePosition(node.parent, node) === Position.RIGHT &&
        this.getNodePosition(node.parent.parent, node.parent) === Position.RIGHT
      ) {
        logger.info(chalk.white.bgRed('[AVLTree.reBalanceNodes]'), chalk.red('LL rotation needed'));

        this.leftRotate(node);

        // RR (single right) rotation if node is inserted into left subtree of left subtree
      } else if (
        this.getNodePosition(node.parent, node) === Position.LEFT &&
        this.getNodePosition(node.parent.parent, node.parent) === Position.LEFT
      ) {
        logger.info(chalk.white.bgRed('[AVLTree.reBalanceNodes]'), chalk.red('RR rotation needed'));

        this.rightRotate(node);
      }
    } else {
      // traverse upwards to check on balance factor of grandparent nodes
      this.reBalanceNodes(node.parent);
    }
  }

  addNode(value: T): void {
    this._orderedNodes = undefined;

    const childNode = new Node(value);

    if (!this.rootNode) {
      this._rootNode = childNode;
      return;
    }

    const parentNode = this.findParentNode(this.rootNode, childNode);
    const comparison = this.compare(parentNode, childNode);

    childNode.parent = parentNode;

    if (comparison === Comparison.LESSER_THAN) {
      parentNode.left = childNode;

      logger.info(
        `[${AVLTree.className}]`,
        chalk.white.bgBlue(
          `Added Node(${childNode.value}) as left child node of Node(${parentNode.value})`
        )
      );
    } else {
      parentNode.right = childNode;

      logger.info(
        `[${AVLTree.className}]`,
        chalk.white.bgBlue(
          `Added Node(${childNode.value}) as right child node of Node(${parentNode.value})`
        )
      );
    }

    this._count += 1;

    this.reBalanceNodes(childNode);
  }
}

export default AVLTree;
