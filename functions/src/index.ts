import { Response } from 'express';
import getAllAchievements from './achievementsController';
import getAllMaterials from './materialsController';

const functions = require('firebase-functions');
const express = require('express');

const app = express();

app.get('/hello', (req: undefined, res: Response) => {
  res.send('hello');
});

app.get('/materials', getAllMaterials);

app.get('/achievements', getAllAchievements);

const main = express();
main.use('/api', app);

exports.api = functions.https.onRequest(main);
