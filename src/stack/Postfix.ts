/**
 * Postfix calculator using stack
 *
 * Infix algorithm (similar to traditional algorithms)
 *
 * e.g. 5 + 6 * 7 - 1 = 47
 * (but how to tell the machine to process operand and operators in which order?)
 *
 * Postfix algorithm (a.k.a. Reverse Polish Notation)
 *
 * 5 6 7 * + 1 - equates to 47
 */

import chalk from 'chalk';
import Stack from './Stack';
import Node from '../doublyLinkedList/Node';
import logger from '../common/logger';

enum Operators {
  PLUS = '+',
  MINUS = '-',
  MULTIPLY = '*',
  DIVIDE = '/',
}

class Postfix {
  static plus(lhs: number, rhs: number): number {
    logger.info(chalk.black.bgYellow(` ${lhs} + ${rhs} `));
    return lhs + rhs;
  }

  static minus(lhs: number, rhs: number): number {
    logger.info(chalk.black.bgYellow(` ${lhs} - ${rhs} `));
    return lhs - rhs;
  }

  static multiply(lhs: number, rhs: number): number {
    logger.info(chalk.black.bgYellow(` ${lhs} * ${rhs} `));
    return lhs * rhs;
  }

  static divide(lhs: number, rhs: number): number {
    logger.info(chalk.black.bgYellow(` ${lhs} / ${rhs} `));
    return lhs / rhs;
  }

  static calculate(tokens: (number | string)[]): number {
    const stack = new Stack<number>();
    let result = 0;

    for (let idx = 0; idx < tokens.length; idx += 1) {
      const token: number | string = tokens[idx];

      if (typeof token === 'number') {
        stack.push(new Node(token));
      } else if (typeof token === 'string') {
        const rhs = stack.peek();
        stack.pop();

        const lhs = stack.peek();
        stack.pop();

        // choose operator function
        let operatorFunc: (lhs: number, rhs: number) => number;

        switch (token) {
          case Operators.PLUS:
            operatorFunc = this.plus;
            break;
          case Operators.MINUS:
            operatorFunc = this.minus;
            break;
          case Operators.MULTIPLY:
            operatorFunc = this.multiply;
            break;
          case Operators.DIVIDE:
            operatorFunc = this.divide;
            break;
          default:
            operatorFunc = (): number => 0;
            break;
        }

        result = operatorFunc(lhs ? lhs.value : 0, rhs ? rhs.value : 0);
        stack.push(new Node(result));
      }
    }

    return result;
  }
}

export default Postfix;
