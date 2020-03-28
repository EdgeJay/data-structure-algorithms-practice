import chalk from 'chalk';
import LinkedList from './LinkedList';
import Node from './Node';
import logger from '../common/logger';

class Example003 {
  static exampleName = 'Linked List: Example 003';

  static start(): void {
    const list = new LinkedList();
    const nodes = [3, 5, 7].map(number => {
      const node = new Node(number);
      list.push(node);
      return node;
    });

    // print out linked list
    let node: Node<number> | null = nodes[0];
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
}

export default Example003;
