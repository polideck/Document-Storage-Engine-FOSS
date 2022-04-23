//Initialize & Verify Configuration
require('dotenv').config({ path: './server.env' });
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const fs = require('fs') 
const envfile = require('envfile')
const sourcePath = 'server.env'
const fileUpload = require('express-fileupload');
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const { concat: uint8ArrayConcat } = require('uint8arrays/concat')
const all = require('it-all')
const { create, globSource } = require('ipfs-http-client')
var multer  =   require('multer');
const Web3 = require('web3');
const {DOCUMENT_CONTRACT_ABI,CONTRACT_ADDRESS,CONTRACT_ABI} = require('./config');

const web3 = new Web3('http://192.168.100.50:8545');


const upload = multer({ dest: 'public/uploads' });

// connect to the default API address http://localhost:5001
const ipfs_client = create()
const contractInstance = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
// call Core API methods
//const { cid } = await ipfs_client.add('Hello world!')
const account = {
    address : "0x21f93e128a6D7926A37DF0c2a94bd0248ea343eF",
    privateKey : "0x8653be3cbd45e2a5de209b52847b52210cf0e1d8ba7eba6ad53f632457085f26"
    };

if(process.env.AESKEY == "" && process.env.IV == "" && process.env.TOKEN_SECRET == ""){
    let parsedFile = envfile.parse(sourcePath);
    var sharedSecret = crypto.createHash('sha256').update(String(crypto.randomBytes(32))).digest('base64').substring(0, 32);
    parsedFile.AESKEY = sharedSecret;

    var initializationVector = crypto.randomBytes(16);
    initializationVector = initializationVector.toString('hex').slice(0, 16);
    parsedFile.IV = initializationVector;

    var initializationTokenSecret = crypto.createHash('sha256').update(String(crypto.randomBytes(32))).digest('base64').substring(0, 32);
    parsedFile.TOKEN_SECRET = initializationTokenSecret;

    fs.writeFileSync('./server.env', envfile.stringify(parsedFile)) 
}

function encrypt(val){
    let cipher = crypto.createCipheriv('aes-256-cbc', process.env.AESKEY, process.env.IV);
    let encrypted = cipher.update(val, 'utf8', 'base64') + cipher.final('base64');
    return encrypted;
}
  
function decrypt(val){
    let decipher = crypto.createDecipheriv('aes-256-cbc', process.env.AESKEY, process.env.IV);
    let decrypted = decipher.update(val, 'base64', 'utf8') + decipher.final('utf8');
    return decrypted;
}

//Start of Server


const app = express()
app.use(bodyparser.urlencoded({extended: true}));

app.use(express.static("public"));
const port = 6969
app.use(fileUpload());
app.use(express.json());



const redis = require('redis');
const client = redis.createClient();
client.on('error', (err) => {console.log('Redis Client Error', err); exit(1);});

(async () => {
    try {
        await client.connect();
    } catch (e) {
        console.log('Redis Failed To Connect:' + e);
    }
})();

const ethUtil = require("@metamask/eth-sig-util");
const { exit } = require('process');

app.get('/', (req, res) => {
    res.redirect('/login')
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname,'public/login.html'));
});

app.get('/search', (req, res) => {
    res.sendFile(path.join(__dirname,'public/searchFiles.html'));
});

app.get('/get_all_files', async (req, res) => {
    const address = req.query.address
    const data = await contractInstance.methods.getListOfDocuments(address).call();
    const results = {
        "data" : JSON.parse(data[0]),
        "addresses" : data[1]
    }
    res.send(results)
});


app.get('/fileupload', (req, res) => {
    res.sendFile(path.join(__dirname,'./public/fileupload.html'));
  });

app.post('/add',(req,res)=>{
    const file = req.files.file;
    const fileName = file.name;
    const filePath = 'public/uploads/'+fileName;
    const senderAddress = req.body.address
    file.mv(filePath,async(err)=>{
        if(err){
            console.log("error : while uploading file");
            return res.status(500).send(err);
        }
        const fileHash = await addIpfsFile (fileName,filePath);

        //Blockchain interaction
        const functionAbi = contractInstance._jsonInterface.find(e => {
            return e.name === "uploadDocument";
          });
        const functionArgs = web3.eth.abi
        .encodeParameters(functionAbi.inputs, [fileHash.toString(),senderAddress,fileName])
        .slice(2);
        const functionParams = {
            to: CONTRACT_ADDRESS,
            data: functionAbi.signature + functionArgs,
            gas: "4000000"  //max number of gas units the tx is allowed to use
          };
        const signedTx = await web3.eth.accounts.signTransaction(functionParams, account.privateKey);
        console.log("sending the txn")
        const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log("tx transactionHash: " + txReceipt.transactionHash);
        console.log("tx contractAddress: " + txReceipt.contractAddress);
        fs.unlink(filePath,(err)=>{
            if(err) console.log(err);
        })
        res.send(fileHash.toString());

    })
});

const addIpfsFile = async (fileName,filePath)=>{
    const file = fs.readFileSync(filePath);
    const fileAdded = await ipfs_client.add({path: fileName,content:file});
    const {cid} = fileAdded;
    return cid;
}

app.get('/file', async (req, res) => {
    var file_path = 'public/downloads/'+req.query.filename;
    const data = uint8ArrayConcat(await all(ipfs_client.cat(req.query.cid)))
    fs.writeFile(file_path, data, function(err, result) {
        res.download(file_path);
      });
});

app.patch('/editFile', async (req, res) => {
    res.sendStatus(200);
});

app.get('/delete', async (req, res) => {
    var owner = req.query.address;
    var hash = req.query.cid;
    const document = await contractInstance.methods.getAddressFromHash(owner,hash).call();
    console.log(document)
    console.log("done")
    //Blockchain interaction
    const functionAbi = contractInstance._jsonInterface.find(e => {
        return e.name === "deleteOwnerFromDocument";
      });
    const functionArgs = web3.eth.abi
    .encodeParameters(functionAbi.inputs, [owner,document])
    .slice(2);
    const functionParams = {
        to: CONTRACT_ADDRESS,
        data: functionAbi.signature + functionArgs,
        gas: "3000000"  //max number of gas units the tx is allowed to use
      };
    const signedTx = await web3.eth.accounts.signTransaction(functionParams, account.privateKey);
    console.log("sending the txn")
    const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log("tx transactionHash: " + txReceipt.transactionHash);
    console.log("tx contractAddress: " + txReceipt.contractAddress);
    res.sendStatus(200);
});

app.get('/api/authenticate-token', (req, res) => {
    const authHeader = req.headers['authorization']

    if (authHeader == null){
        return res.sendStatus(401);
    }

    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null){
        return res.sendStatus(401)
    }
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err) => {  
      if (err){
          return res.sendStatus(403)
      }

      return res.sendStatus(200);
    })
})

app.get('/api/getNonce', async (req, res) => {
    var nonce = await getNonce(req.query.publicAddress);
    res.send({ nonce: nonce });
});

app.get('/api/getJWT', async (req, res) => {
    try{ 
        const address = req.query.address;
        const parsedData = JSON.parse(req.query.data)
        const parsedSig = JSON.parse(req.query.sig)

        //Todo: Check that user is someone we authorized to be in the system

        const recovered = ethUtil.recoverTypedSignature({
            data: parsedData,
            signature: parsedSig,
            version: "V4"
        });

        if (recovered == address) {
            console.log('Successfully recovered signer as ' + address);


            //Generate JWT
            const expiration = Date.now() + 1800;

            const token = jwt.sign({publicAddress: address, exp: expiration}, process.env.TOKEN_SECRET);

            //Send Back JWT token
            res.json(token);
        } else {
            console.log('Failed to verify signer when comparing ' + parsedSig + ' to ' + address);

            res.sendStatus(501);
        }
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

app.listen(port, () => {
    console.log(`Polideck Document Storage Engine is running on localhost:${port}`)
})

async function getNonce(address) {
    var randomNonce = crypto.randomUUID();
    client.set(address, randomNonce);
    const nonce = await client.get(address);
    return nonce;
}

//besu --rpc-http-enabled --genesis-file=/home/capstone/Documents/besu-22.1.0/build/distributions/besu-22.1.0/genesis.json
//besu --config-file=besu-config.toml --rpc-http-enabled
//besu --network=dev --miner-enabled --miner-coinbase=0xfe3b557e8fb62b89f4916b721be55ceb828dbd73 --rpc-http-cors-origins="all" --host-allowlist="*" --rpc-ws-enabled --rpc-http-enabled --data-path=/tmp/tmpDatdir