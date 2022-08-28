const SHA256 = require('crypto-js/sha256');


class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    
    /**
     * Method calculates hash of current block
     */
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();       
    }
}

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Blockchain {
    constructor(difficulty) {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = difficulty;
        this.miningReward = 100;
        this.pendingTransactions = [];
    }

    createGenesisBlock() {
        return new Block("01/01/2022", new Transaction(null, null, 0), "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    mineBlock(minerRewardAddress) {
        const newBlock = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock.hash);
        console.log("mining Block...")
        // use the set previousHash in order to calculate the new block hash
        while (newBlock.hash.substring(0, this.difficulty) !== new Array(this.difficulty).fill(0).join("")) {
            // the nonce value only changes when trying to add a new block to the blockchain
            // it stays constant when trying to recalculate hash (so verifying will not be a problem)
            newBlock.nonce++;
            newBlock.hash = newBlock.calculateHash();
        }

        // add block to the end of the chain
        this.chain.push(newBlock);
        this.pendingTransactions = [
            new Transaction(null, minerRewardAddress, this.miningReward)
        ]
        console.log("block added");

    }

    createTransaction(fromAddress, toAddress, amount) {
        const transaction = new Transaction(fromAddress, toAddress, amount);
        this.pendingTransactions.push(transaction);
    }

    getBalance(balanceAddress) {
        let balance = 0;
        for (let i = 0; i < this.chain.length; i++) {
            for (let x = 0; x < this.chain[i].transactions.length; x++) {
                const transaction = this.chain[i].transactions[x];
                if (transaction.fromAddress === balanceAddress) {
                    balance -= transaction.amount;
                } else if (transaction.toAddress === balanceAddress) {
                    balance += transaction.amount;
                }
            }
        }
        
        return balance;
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash.substring(0, this.difficulty) !== new Array(this.difficulty).fill(0).join("")) {
                return false;
            }
            // If the data is tampered with, and hash is NOT updated, this will fail
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {

                return false;
            }
        }

        return true;
    }
}


const tawsifCoin = new Blockchain(2);
tawsifCoin.createTransaction("tawsif", "nabeel", 100);
tawsifCoin.createTransaction("nabeel", "tawsif", 50);


tawsifCoin.mineBlock("ZeyadTheMiner");
tawsifCoin.mineBlock("ZeyadTheMiner");
const tawsifsBalance = tawsifCoin.getBalance("ZeyadTheMiner");
console.log(tawsifsBalance);