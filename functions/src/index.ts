// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const express = require('express');
const app = express();

app.get('/api', (req: any, res: any) => {
  res.send('API output');
});
app.get('*', (req: any, res: any) => {
  res.send("Hello from the API");
});

exports.api = functions.https.onRequest(app);
