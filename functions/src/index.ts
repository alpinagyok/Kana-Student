import { Response } from 'express';
import getAllAchievements from './achievementsController';
import getAllMaterials from './materialsController';
import { createUser } from './usersController';
import validateUsers from './validation/users';

const functions = require('firebase-functions');
const express = require('express');

const app = express();

app.get('/hello', (req: undefined, res: Response) => {
  res.send('hello');
});

app.get('/materials', getAllMaterials);

app.get('/achievements', getAllAchievements);

app.post('/users/create', validateUsers('createUser'), createUser);

const main = express();
main.use('/api', app);

exports.api = functions.https.onRequest(main);
