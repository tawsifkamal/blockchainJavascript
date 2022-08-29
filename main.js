const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const tawsifCoin = new Blockchain(4);

const privateKey = "540281221217ee14d88849409832ae1a596b7d157aaae677b5f1fb0f86e6b6fb";
const keyPair = ec.keyFromPrivate(privateKey);
const fakeKeyPair = ec.keyFromPublic('04d8e01e8babafbb6cdc51b79e066bbf706a4e0c18de2554cb350ff2c6630729294a816c7812e55890801e3652921d96e398b1540244e73685b34d6d4475454ec2', 'hex')
const myAddress = keyPair.getPublic('hex');

const transaction = new Transaction(myAddress, "dummy address", 40);
transaction.signTransaction(keyPair);
tawsifCoin.addTransaction(transaction);

const newTransaction = new Transaction(myAddress, "another Dummy address", 50);
newTransaction.signTransaction(keyPair);
tawsifCoin.addTransaction(newTransaction);

tawsifCoin.mineBlock(myAddress);

console.log(tawsifCoin.chain[1].transactions[0].amount = 500);
console.log(tawsifCoin.chain[1].transactions[0].isValid());
console.log(tawsifCoin.chain[1].transactions[1].isValid());

const myBalance = tawsifCoin.getBalance(myAddress);
console.log(myBalance);