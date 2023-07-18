import { glob } from 'glob';
import { spawnSync } from 'node:child_process';

console.log(`Running all tests matching ${process.argv[2]}`);
const files = await glob(process.argv[2], { nodir: true });

for (const file of files) {
  const args = [];
  if (file.split('.').pop() === 'ts') {
    args.push('--loader', 'tsx');
  }

  const cmd = ['node', [...args, '--test', file]]
  console.log(`\nRunning ${cmd.flat().join(' ')}`);

  // TODO use spawn instead of spawnSync, with better output management
  spawnSync(...cmd, { stdio: 'inherit' });
}
