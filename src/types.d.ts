type BuildInfo = {
  binPath: string;
  absBinPath: string;
}

type LangEntry = {
  name: string;
  short: string;
  builder: () => Promise<BuildInfo>;
}