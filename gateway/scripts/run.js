#!/usr/bin/env node

const yargs = require("yargs");
const argv = yargs.argv;

const command = argv._[0];

switch (command) {
  case "start": {
    require("./start.js");
    break;
  }
  case "config": {
    require("./config.js");
    break;
  }
  default: {
    require("./start.js");
    break;
  }
}
