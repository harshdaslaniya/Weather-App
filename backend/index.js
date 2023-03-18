const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const requests = require('requests');
const app = express();
const hostname = '0.0.0.0';
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


  app.post('/submit', (req, res) => {
    const search = req.body.search;
    // Do something with the name value
    let  jsonData;
    requests(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=31385598213606e38d0bd58b0a7f9db2`)
    .on('data', function (chunk) {
      jsonData = JSON.parse(chunk);
      console.log(jsonData);
      res.send(chunk);
    })
    .on('end', function (err) {
      if (err) return console.log('connection closed due to errors', err);
      console.log('end');
    });
    // res.send(jsonData);
  });
// Start the server
app.listen(port, hostname ,() => {
  console.log(`Server started on http://${hostname}:${port}`);
});
