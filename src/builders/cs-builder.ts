import { $ } from 'bun';
import path from 'path';

/* 環境変数 */
const publishDir = './publish';
const binName = 'static_file_servers'; //undefined ok

const cs_builder = async (): Promise<BuildInfo> => {
  const compileResult = await $`dotnet publish -c Release`;

  if (compileResult.exitCode !== 0) {
    console.error('Failed to compile C# project');
    console.error(compileResult.stderr);
    process.exit(1);
  }

  console.log('C# project compiled successfully');

  const binPath = path.join(publishDir, binName);
  const absBinPath = path.resolve(binPath);
  console.log('binPath:', binPath);
  console.log('absBinPath:', absBinPath);
  return {
    binPath,
    absBinPath,
  };
};

if (import.meta.path === Bun.main) {
  cs_builder();
}

export default cs_builder;
