import { Response } from 'express';
import getAllMaterials from './materialsController';

const functions = require('firebase-functions');
const express = require('express');

const app = express();

app.get('/hello', (req: undefined, res: Response) => {
  res.send('hello');
});

app.get('/materials', getAllMaterials);

const main = express();
main.use('/api', app);

exports.api = functions.https.onRequest(main);
