import chalk from 'chalk';
import LinkedList from './LinkedList';
import Node from './Node';
import logger from '../common/logger';

class Example002 {
  static exampleName = 'Linked List: Example 002';

  static start(): void {
    const list = new LinkedList();
    const firstNode = new Node(3);
    const middleNode = new Node(5);
    const lastNode = new Node(7);

    list.unshift(lastNode);
    list.unshift(middleNode);
    list.unshift(firstNode);

    // print out linked list
    let node: Node<number> | null = firstNode;
    const nodeValues = [firstNode.value];
    while (node) {
      if (node.next) {
        logger.info(
          chalk.greenBright(`[${this.exampleName}]`),
          `Node(${node.value}) is linked to Node(${node.next.value})`
        );
        nodeValues.push(node.next.value);
      } else {
        logger.info(
          chalk.greenBright(`[${this.exampleName}]`),
          `Node(${node.value}) not linked to a Node`
        );
      }
      node = node.next;
    }

    logger.info(
      chalk.greenBright(`[${this.exampleName}]`),
      `Linked list: ${nodeValues.join(' --> ')}`
    );
  }
}

export default Example002;
