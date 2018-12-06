const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");

const app = express();
const status = require('./server/routes/status');

// inject custom middleware into the pipeline
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../frontend/dist/what2eat')));
app.use('/api', status);

// redirect all requests (except api) to the index page.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/what2eat/index.html'));
});

const appPort = process.env.PORT || 4600;
app.listen(appPort, () => console.log(`listening on port ${appPort}`));
