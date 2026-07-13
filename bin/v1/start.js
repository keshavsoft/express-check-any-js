import parseInput from "./core/parseInput.js";
import showUsage from './core/showUsage.js';

import updateJs from "./UpdateJs/index.js";

import pkg from '../../package.json' with { type: 'json' };

const version = pkg.version;

const run = ({ jsFilePath, inCheckLines, showLog }) => {
  const input = parseInput({ jsFilePath, inCheckLines, showLog });

  if (input.cmd === "--help" || input.cmd === "-h" || input.cmd === "help") return showUsage(version);

  updateJs(input);
};

export default run;