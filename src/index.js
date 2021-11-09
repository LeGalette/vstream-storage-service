const express = require('express')
const {Storage} = require('@google-cloud/storage')

const storage = new Storage();

// Creates a client from a Google service account key
const storage = new Storage({keyFilename: 'key.json'});
const bucketName = 'vstorage39f';

async function createBucket() {
  // Creates the new bucket
  await storage.createBucket(bucketName);
  console.log(`Bucket ${bucketName} created.`);
}

createBucket().catch(console.error);