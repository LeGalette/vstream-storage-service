const express = require('express')
// Imports the Google Cloud client library.
const { Storage } = require('@google-cloud/storage');

const app = express()
const PORT = 8082 //process.env.PORT
const bucketName = "vstorage39f"

// Makes an authenticated API request.
async function createBlobService() {
  const storage = await new Storage();
  return storage
}


async function getFileName() {
  const storage = await createBlobService()
  const [files] = await storage.bucket(bucketName).getFiles();

  console.log(files[0].name)
  const filename = await storage.bucket(bucketName).file('sample1.mp4')
  await console.log(filename)
  return files[0].name
}


app.get("/video", async (req, res) => {
  const storage = await createBlobService()

  res.writeHead(200, {
    "content-length": 1,
    "content-type": "video/mp4"
  })

  await storage
    .bucket(bucketName)
    .file('sample1.mp4')
    .createReadStream(err => {
      if (err) {
        res.sendStatus(500)
      }
    })
    .pipe(res, err => {
      if (err) {
        res.sendStatus(500)
      }

      res.writeHead(200, {
        "Content-Length": properties.contentLength,
        "content-type": "video/mp4"
      })
    })
    .on('finish', () => {
    });
})

app.listen(PORT, () => {
  console.log('running')
})