import { execFileSync } from 'child_process';
import { existsSync, unlinkSync } from 'fs';
import { join } from 'path';

const projectDir = '/vercel/share/v0-project';
const lockFile = join(projectDir, 'package-lock.json');

// Remove stale lock file if it exists
if (existsSync(lockFile)) {
  console.log('Removing stale package-lock.json...');
  unlinkSync(lockFile);
}

try {
  console.log('Regenerating package-lock.json via npm install...');
  const npmPath = process.env.npm_execpath || '/usr/local/bin/npm';
  execFileSync(process.execPath, [npmPath, 'install', '--package-lock-only'], {
    cwd: projectDir,
    stdio: 'inherit',
    env: { ...process.env, HOME: process.env.HOME || '/tmp' }
  });
  console.log('package-lock.json regenerated successfully.');
} catch (error) {
  console.error('Failed to regenerate lock file:', error.message);
  process.exit(1);
}
