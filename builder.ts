import { $ } from 'bun';
import { stat, symlink } from 'node:fs/promises';
import path from 'node:path';

//builders
import cs_builder from './src/builders/cs-builder';
import {
  nodejs_builder,
  bun_builder,
  deno_builder,
  php_builder,
  python_builder,
  ruby_builder,
} from './src/builders/scriptslike-builder';

/* 環境変数 */
const commandPrefix = 'webs-';
const langMap: LangEntry[] = [
  //available only
  {
    name: 'C#',
    short: 'cs',
    builder: cs_builder,
  },
  {
    name: 'Node.js',
    short: 'node',
    builder: nodejs_builder,
  },
  {
    name: 'bun(TypeScript)',
    short: 'bun',
    builder: bun_builder,
  },
  {
    name: 'deno(TypeScript)',
    short: 'deno',
    builder: deno_builder,
  },
  {
    name: 'PHP',
    short: 'php',
    builder: php_builder,
  },
  {
    name: 'Python',
    short: 'py',
    builder: python_builder,
  },
  {
    name: 'Ruby',
    short: 'rb',
    builder: ruby_builder,
  },
];
const repoBinDir = './bin/forusers';

const compileLang = async (lang: LangEntry) => {
  console.log('Building...', lang.name);
  const commandName = commandPrefix + lang.short;
  const { binPath, absBinPath } = await lang.builder();
  const binPathForUsers = path.join(import.meta.dir, repoBinDir, commandName);
  await symlink(absBinPath, binPathForUsers);
  return binPathForUsers;
};

const recycler = async () => {
  await $`bash ./recycle.bash`;
};

(async () => {
  try {
    const stats = await stat(repoBinDir);
    if (stats.isDirectory()) {
      await recycler();
    } else if (stats.isFile()) {
      await recycler();
    } else {
      console.error(`${repoBinDir} はディレクトリでもファイルでもありません。`);
    }
  } catch (error) {
    const eerror = error as NodeJS.ErrnoException;
    if (eerror.code === 'ENOENT') {
      await recycler();
    } else {
      console.error(`エラーが発生しました: ${eerror}`);
    }
  }
  const sfs = 'static-file-servers';
  if (sfs !== import.meta.dir.split('/').pop()) {
    console.error('[static-file-server] current is not root dir.');
    process.exit(1);
  }
  /* ================ */
  console.log('All languages are building...');
  const allResults = [];
  for (const lang of langMap) {
    allResults.push(await compileLang(lang));
  }
  console.log('All languages are built successfully');
  console.log('Results:');
  console.log(allResults);
  const messageForUsers = `write end of rc files\n\n#bad-company static-file-servers\nexport PATH="$PATH:${path.resolve(
    repoBinDir
  )}"\n\n`;
  console.log(messageForUsers);
})();
