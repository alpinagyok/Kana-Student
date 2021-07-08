import { getAllMaterials } from "./materialsController";

const functions = require('firebase-functions');
const express = require('express');
const app = express();

app.get('/hello', (req: any, res: any) => {
  res.send('hello');
});

app.get('/materials', getAllMaterials)

exports.api = functions.https.onRequest(app);
