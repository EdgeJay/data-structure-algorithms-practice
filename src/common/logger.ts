/* eslint-disable no-console */

import chalk from 'chalk';

function info(...args: unknown[]): void {
  console.log(chalk.blue('[INFO] '), ...args);
}

export default { info };
