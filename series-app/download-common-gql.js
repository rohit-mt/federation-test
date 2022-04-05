const https = require("https");
const http = require("http");
const fs = require("fs");

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

const url = "http://localhost:8080/common.graphql";
const targetFile = "common.graphql";

async function downloadCommonSchema() {
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
