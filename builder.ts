import { $ } from 'bun';
import { promises as fs } from 'fs';
import path from 'node:path';

//builders
import cs_builder from './src/builders/cs-builder';

/* 環境変数 */
const commandPrefix = 'webs-';
const langMap: LangEntry[] = [
  //available only
  {
    name: 'C#',
    short: 'cs',
    builder: cs_builder,
  },
];
const repoBinDir = 'bin/forusers';

await (async () => {
  try {
    const stats = await fs.stat(repoBinDir);
    if (stats.isDirectory()) {
      await fs.rmdir(repoBinDir, { recursive: true });
    } else if (stats.isFile()) {
      await fs.unlink(repoBinDir);
    } else {
      console.error(`${repoBinDir} はディレクトリでもファイルでもありません。`);
    }
  } catch (error) {
    const eerror = error as NodeJS.ErrnoException;
    if (eerror.code === 'ENOENT') {
      const repoBinDirUrl = new URL(repoBinDir, import.meta.url);
      await fs.mkdir(repoBinDirUrl, { recursive: true });
    } else {
      console.error(`エラーが発生しました: ${eerror}`);
    }
  }
})();

const compileLang = async (lang: LangEntry) => {
  console.log('Building...', lang.name);
  const commandName = commandPrefix + lang.short;
  const { binPath, absBinPath } = await lang.builder();
  const binPathForUsers = path.join(import.meta.dir, repoBinDir, commandName);
  await fs.symlink(absBinPath, binPathForUsers);
  console.log(`linked to ${binPathForUsers}`);
  return binPathForUsers;
};

await (async () => {
  const sfs = 'static-file-servers';
  if (sfs !== import.meta.dir.split('/').pop()) {
    console.error('[static-file-server] current is not root dir.');
    process.exit(1);
  }
  console.log('All languages are building...');
  const allResults = await Promise.all(langMap.map(compileLang));
  console.log('All languages are built successfully');
  console.log('Results:');
  console.log(allResults);
  const messageForUsers = `write end of rc files\n\n#bad-company static-file-servers\nexport PATH="$PATH:${path.resolve(
    repoBinDir
  )}"\n\n`;
  console.log(messageForUsers);
})();
