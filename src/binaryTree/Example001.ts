import BinaryTree from './BinaryTree';
import logger from '../common/logger';

class Example001 {
  static start(): void {
    const tree = new BinaryTree<number>();
    tree.addNodes([4, 5, 1, 3, 7, 2]);

    const tree2 = new BinaryTree<number>();
    tree2.addNodes([4, 2, 6, 1, 3, 5, 8, 7]);
    logger.info(tree2.rootNode?.value);
    logger.info(tree2.rootNode?.left?.value);

    tree2.removeNode(2);
    logger.info(tree2.rootNode?.value);
    logger.info(tree2.rootNode?.left?.value);
  }
}

export default Example001;
