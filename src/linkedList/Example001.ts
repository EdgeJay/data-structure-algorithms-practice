import chalk from 'chalk';
import Node from './Node';
import logger from '../common/logger';

class Example001 {
  static exampleName = 'Linked List: Example 001';

  static start(): void {
    const firstNode = new Node(3);
    const middleNode = new Node(5);
    const lastNode = new Node(7);

    firstNode.next = middleNode;
    middleNode.next = lastNode;

    // print out linked list
    let node: Node<number> | null = firstNode;
    const nodeValues = [firstNode.value];
    while (node) {
      if (node.next) {
        logger.info(
          chalk.magenta(`[${this.exampleName}]`),
          `Node(${node.value}) is linked to Node(${node.next.value})`
        );
        nodeValues.push(node.next.value);
      } else {
        logger.info(
          chalk.magenta(`[${this.exampleName}]`),
          `Node(${node.value}) not linked to a Node`
        );
      }
      node = node.next;
    }

    logger.info(chalk.magenta(`[${this.exampleName}]`), `Linked list: ${nodeValues.join(' --> ')}`);
  }
}

export default Example001;
