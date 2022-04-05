const https = require("https");
const http = require("http");
const fs = require("fs");

require("dotenv").config();

function downloadFile(url, targetPath) {
  const get = url.includes("https://") ? https.get : http.get;
  return new Promise((resolve) => {
    const target = fs.createWriteStream(targetPath);
    get(url, (response) => {
      response
        .pipe(target)
        .on("close", () => {
          resolve(true);
        })
        .on("finish", () => {
          target.close();
          resolve(true);
        })
        .on("error", (err) => {
          console.log(err);
          resolve(false);
        });
    });
  });
}

const url = process.env.REMOTE_GQL_URL;
const targetFile = "remote-gql/schema.graphql";

async function downloadCommonSchema() {
  if (!url) {
    console.error("REMOTE_GQL_URL env. var not set");
  }

  const saved = await downloadFile(url, targetFile);

  if (saved) {
    console.log("🥳 Downloaded");
  } else {
    console.error("😕 Failed to download");
  }
}

(async () => {
  await downloadCommonSchema();
})();
