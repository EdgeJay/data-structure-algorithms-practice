import chalk from 'chalk';
import Postfix from './Postfix';
import logger from '../common/logger';

class Example002 {
  static exampleName = 'Stack: Example 002 - Postfix calculator';

  static start(): void {
    const equation = [5, 6, 7, '*', '+', 1, '-'];

    logger.info(`[${this.exampleName}]`, `Evaluating: ${equation.join(' ')}`);

    const result = Postfix.calculate(equation);
    logger.info(`[${this.exampleName}]`, chalk.green(`Result: ${result}`));
  }
}

export default Example002;
