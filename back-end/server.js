'use strict';

const express = require('express');
var bodyParser = require('body-parser');
var path = require("path");
const AWS = require('aws-sdk');
var multer  =   require('multer');
var multerS3 = require('multer-s3');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const ID = '';
const SECRET = '';
const BUCKET_NAME = 'polideck-bucket-1';


// App
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));

const s3 = new AWS.S3({
  accessKeyId: 'AKIA5JKZND6QG7QZMIHZ',
  secretAccessKey: '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',
  region: 'us-west-1'
})


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'./public/index.html'));
});

app.get('/fileupload', (req, res) => {
  res.sendFile(path.join(__dirname,'./public/fileupload.html'));
});

var upload = multer({
  storage: multerS3({
      s3: s3,
      bucket: BUCKET_NAME,
      key: function (req, file, cb) {
          console.log(file);
          cb(null, file.originalname); //use Date.now() for unique file keys
      }
  })
});

app.post('/add', upload.array('upl',1), function (req, res, next) {
  res.send("Uploaded!");
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);


