'use strict';

const express = require('express');
var bodyParser = require('body-parser');
var path = require("path");

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'./public/index.html'));
});

app.post('/add', function(req,res){
  res.send("Received document named " + req.body.filename);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
