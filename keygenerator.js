const EC = require('elliptic').ec
const ec = new EC('secp256k1');

const keyPair = ec.genKeyPair();
const publicKey = keyPair.getPublic('hex');
const privateKey = keyPair.getPrivate('hex');

const key = ec.keyFromPrivate("540281221217ee14d88849409832ae1a596b7d157aaae677b5f1fb0f86e6b6fb");


const message = "hello";
const signedKey = key.sign(message, 'base64').toDER('hex');
const keyFromPublic = ec.keyFromPublic("04d8e01e8babafbb6cdc51b79e066bbf706a4e0c18de2554cb350ff2c6630729294a816c7812e55890801e3652921d96e398b1540244e73685b34d6d4475454ec2", 'hex');
console.log(keyFromPublic.verify("hello", signedKey));