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
const BUCKET_NAME = 'polideck-bucket-2';


// App
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));

const s3 = new AWS.S3({
  accessKeyId: 'AKIAWJGRR673AQTJYVWD',
  secretAccessKey: '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',
  region: 'us-west-1'
})

const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "data",
				"type": "string"
			}
		],
		"name": "set",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "get",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

const web3 = new Web3('http://localhost:8545');

app.get('/', (req, res) => {
  const accounts = web3.eth.getAccounts();
  console.log(accounts);
  res.send(accounts);
});

app.get('/fileupload', (req, res) => {
  res.sendFile(path.join(__dirname,'./public/fileupload.html'));
});

var upload = multer({
  storage: multerS3({
      s3: s3,
      bucket: BUCKET_NAME,
      key: function (req, file, cb) {
          cb(null, file.originalname);
      }
  })
});

app.post('/add', upload.single('upl'), function (req, res) {
  web3.eth.getAccounts().then(accounts => {
    var poliContract = new web3.eth.Contract(abi, '0xf4B8b9DC24d8174585f7f58e813a002DC8cA5bf1',{from:accounts[0]})
    poliContract.methods.set(req.file.etag).send().then(function(receipt){
      console.log(receipt);
  });
   });
   
  res.send("Uploaded! " + req.file.etag);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);


