import chalk from 'chalk';
import AVLTree from './AVLTree';
import logger from '../common/logger';

logger.info(
  chalk.greenBright(`
  
--- AVL Tree 1 ---
`)
);

const tree = new AVLTree<number>();

[4, 2, 6, 1, 3, 5, 8, 7].forEach(value => {
  tree.addNode(value);
});

let orderedNodes = tree.traverseInOrder().map(node => node.value);
logger.info(`Node values in order: [${orderedNodes.join(', ')}]`);
logger.info(`Height of Node(2): ${tree.height(2)}`);
logger.info(`Height of Node(4): ${tree.height(4)}`);
logger.info(`Balance factor of Node(4): ${tree.balanceFactor(4)}`);

logger.info(
  chalk.greenBright(`

--- AVL Tree 2 ---
`)
);

const tree2 = new AVLTree<number>();

[4, 2, 6, 1, 3, 5, 8, 7, 10, 9].forEach(value => {
  tree2.addNode(value);
});

orderedNodes = tree2.traverseInOrder().map(node => node.value);
logger.info(`Node values in order: [${orderedNodes.join(', ')}]`);
logger.info(`Height of Node(4): ${tree2.height(4)}`);
logger.info(`Balance factor of Node(4): ${tree2.balanceFactor(4)}`);

logger.info(
  chalk.greenBright(`

--- Unbalanced AVL Tree 1 ---
`)
);

const tree3 = new AVLTree<number>();

[3, 2, 1].forEach(value => {
  tree3.addNode(value);
});

logger.info(tree3.rootNode);
logger.info(tree3.rootNode?.left);
logger.info(tree3.rootNode?.right);
