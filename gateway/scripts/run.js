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
  case "config":
    require("./config.js");
    break;

  case "start":
  default:
    require("./start.js");
    break;
}
