import chalk from 'chalk';
import Stack from './Stack';
import Node from '../doublyLinkedList/Node';
import logger from '../common/logger';

class Example001 {
  static exampleName = 'Stack: Example 001';

  static print(stack: Stack<string>): void {
    let node: Node<string> | null = stack.list.head;
    const nodeValues = [node?.value];
    while (node) {
      if (node.next) {
        logger.info(
          chalk.blueBright(`[${this.exampleName}]`),
          `Node(${node.value}) is linked to Node(${node.next.value})`
        );
        nodeValues.push(node.next.value);
      } else {
        logger.info(
          chalk.blueBright(`[${this.exampleName}]`),
          `Node(${node.value}) not linked to a Node`
        );
      }
      node = node.next;
    }

    logger.info(
      chalk.blueBright(`[${this.exampleName}]`),
      `Linked list: ${nodeValues.join(' --> ')}`
    );
  }

  static start(): void {
    const stack = new Stack<string>();

    ['Red Plate', 'Blue Plate', 'Yellow Plate', 'Black Plate'].forEach(plate => {
      stack.push(new Node<string>(plate));
    });

    // print out linked list
    this.print(stack);

    stack.pop();

    // print out linked list again
    this.print(stack);

    // Add nodes to end of list
    stack.push(new Node('Green Plate'));

    // print out linked list again
    this.print(stack);
  }
}

export default Example001;
