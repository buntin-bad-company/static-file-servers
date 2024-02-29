import { $ } from 'bun';
import path from 'path';

/* 環境変数 */
const nodejs = 'node.js';
const bun = 'bun.ts';
const deno = 'deno.ts';
const php = 'php.php';
const python = 'python.py';
const ruby = 'ruby.rb';

const srcDir = './src';

const nodejsPath = path.join(srcDir, nodejs);
const bunPath = path.join(srcDir, bun);
const denoPath = path.join(srcDir, deno);
const phpPath = path.join(srcDir, php);
const pythonPath = path.join(srcDir, python);
const rubyPath = path.join(srcDir, ruby);

export const nodejs_builder = async (): Promise<BuildInfo> => {
  return {
    binPath: nodejsPath,
    absBinPath: path.resolve(nodejsPath),
  };
};
export const bun_builder = async (): Promise<BuildInfo> => {
  return {
    binPath: bunPath,
    absBinPath: path.resolve(bunPath),
  };
};
export const deno_builder = async (): Promise<BuildInfo> => {
  const outBinPath = path.join(process.cwd(), 'bin', 'webs-deno');
  const buildResult =
    await $`deno compile --allow-all --output ${outBinPath} ${denoPath}`;
  return {
    binPath: outBinPath,
    absBinPath: path.resolve(outBinPath),
  };
};
export const php_builder = async (): Promise<BuildInfo> => {
  return {
    binPath: phpPath,
    absBinPath: path.resolve(phpPath),
  };
};
export const python_builder = async (): Promise<BuildInfo> => {
  return {
    binPath: pythonPath,
    absBinPath: path.resolve(pythonPath),
  };
};
export const ruby_builder = async (): Promise<BuildInfo> => {
  return {
    binPath: rubyPath,
    absBinPath: path.resolve(rubyPath),
  };
};

if (import.meta.path === Bun.main) {
  await nodejs_builder();
  await bun_builder();
  await deno_builder();
  await php_builder();
  await python_builder();
  await ruby_builder();
}
