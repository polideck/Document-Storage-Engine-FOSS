'use strict';

const express = require('express');
var bodyParser = require('body-parser');
var path = require("path");
const AWS = require('aws-sdk');
var multer  =   require('multer');
var multerS3 = require('multer-s3');
const Web3 = require('web3');

// Constants
const PORT = 80;
const HOST = '0.0.0.0';
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

//const web3 = new Web3('http://localhost:8545');

app.get('/', (req, res) => {
<<<<<<< HEAD
  const accounts = web3.eth.getAccounts();
  console.log(accounts);
  res.send(accounts);
=======
  res.sendFile(path.join(__dirname,'./public/fileupload.html'));
>>>>>>> 4cebe33b2c7cbdd7c35e261b8b33ce41ce3a6eaf
});

app.get('/fileupload', (req, res) => {
  /*
  web3.eth.getAccounts().then(accounts => {
    console.log(`Using account ${accounts[0]}`)
    var poliContract = web3.eth.contract('');
    var poli = poliContract.at('0xab5058d5398c4b9eb350b3384c7daca0a27a9f3e');
    poli.set('req.file.etag');
    console.log(poli.get());
    return accounts[0]
   });
   */
  res.sendFile(path.join(__dirname,'./public/fileupload.html'));
});

var upload = multer({
  storage: multerS3({
      s3: s3,
      bucket: BUCKET_NAME,
      key: function (req, file, cb) {
          console.log(file);
          cb(null, file.originalname);
      }
  })
});

app.post('/add', upload.single('upl'), function (req, res) {
  res.send("Uploaded! " + req.file.etag);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);


