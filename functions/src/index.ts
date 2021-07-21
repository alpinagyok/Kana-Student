import { Response } from 'express';
import {
  checkForAndAddUsersAchievments, getAllAchievements, getUsersAchievements,
} from './achievementsController';
import getAllMaterials from './materialsController';
import { checkIfAuthenticated, createUser } from './usersController';
import validateUsers from './validation/users';

const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const app = express();

// Enable pre-flight request
app.use(cors());
app.options('*', cors());

app.get('/hello', (req: undefined, res: Response) => {
  res.send('hello');
});

app.get('/materials', getAllMaterials);

app.get('/achievements', getAllAchievements);
app.post('/achievements/check', checkIfAuthenticated, checkForAndAddUsersAchievments);
app.get('/achievements/userSpecific', checkIfAuthenticated, getUsersAchievements);

app.post('/users/create', validateUsers('createUser'), createUser);

const main = express();
main.use('/api', app);

exports.api = functions.https.onRequest(main);
