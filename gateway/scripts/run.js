#!/usr/bin/env node

const yargs = require("yargs");
const dotenv = require("dotenv");
const path = require("path");
const argv = yargs.argv;

const command = argv._[0];

if (argv.env) {
  dotenv.config({ path: path.resolve(process.cwd(), argv.env) });
}

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
