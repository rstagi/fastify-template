import { glob } from 'glob';
import { spawn } from 'child_process';

console.log(`Running all tests matching ${process.argv[2]}`);
const files = await glob(process.argv[2], { nodir: true });
files.forEach((file) => {
  const args = [];
  if (file.split('.').pop() === 'ts') {
    args.push('--loader', 'tsx');
  }

  console.log(`Running tests in ${file}`);
  spawn(
    'node',
    [...args, '--test', file]
  );
});
