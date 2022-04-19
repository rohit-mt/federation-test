const concurrently = require("concurrently");
const path = require("path");

concurrently(
  [
    {
      command: "kill-port 5000 5001 5002",
      name: "killport",
      cwd: path.resolve(__dirname, "./"),
      prefixColor: "red"
    },
    {
      command: "npm start",
      name: "users-app",
      cwd: path.resolve(__dirname, "./users-app"),
      prefixColor: "blue"
    },
    {
      command: "npm start",
      name: "series-app",
      cwd: path.resolve(__dirname, "./series-app"),
      prefixColor: "magenta"
    },
    {
      command: "npm start",
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
