#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const config = fs.readFileSync(path.join(__dirname, "../.env"), {
  encoding: "utf8",
  flag: "r"
});

console.log(config);
