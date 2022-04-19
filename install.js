const concurrently = require("concurrently");
const path = require("path");

concurrently(
  [
    {
      command: "npm install",
      name: "users-app",
      cwd: path.resolve(__dirname, "./users-app"),
      prefixColor: "blue"
    },
    {
      command: "npm install",
      name: "series-app",
      cwd: path.resolve(__dirname, "./series-app"),
      prefixColor: "magenta"
    },
    {
      command: "npm install",
      name: "gateway",
      cwd: path.resolve(__dirname, "./gateway"),
      prefixColor: "green"
    }
  ],
  {
    prefix: "name",
    restartTries: 3
  }
);
