import chalk from 'chalk';
import LinkedList from './LinkedList';
import Node from './Node';
import logger from '../common/logger';

class Example001 {
  static exampleName = 'Doubly Linked List: Example 001';

  static print(list: LinkedList<number>): void {
    let node: Node<number> | null = list.head;
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
    const list = new LinkedList<number>();
    [7, 9, 11].map(number => {
      const node = new Node(number);
      list.push(node);
      return node;
    });

    // print out linked list
    this.print(list);

    list.unshift(new Node(5));

    // print out linked list again
    this.print(list);

    // Remove last node
    list.pop();

    // print out linked list again
    this.print(list);

    // Add nodes to end of list
    list.push(new Node(15));
    list.push(new Node(17));

    // print out linked list again
    this.print(list);
  }
}

export default Example001;
