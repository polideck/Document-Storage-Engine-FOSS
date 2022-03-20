//Initialize & Verify Configuration
require('dotenv').config({ path: './server.env' });
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const fs = require('fs') 
const envfile = require('envfile')
const sourcePath = 'server.env'

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

const express = require('express');
const path = require('path');
const app = express()
app.use(express.static("public"));
const port = 3000

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

app.get('/fileupload', (req, res) => {
    res.sendFile(path.join(__dirname,'./public/fileupload.html'));
  });


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
            console.log(process.env.TOKEN_SECRET);

            const expiration = Date.now() + 1800;

            const token = jwt.sign({publicAddress: address, exp: expiration}, process.env.TOKEN_SECRET);
            console.log(token)
            //Send Back JWT token
            res.send(token);
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
