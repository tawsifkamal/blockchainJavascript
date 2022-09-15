const BlockSchema = require("./Block").schema;
const mongoose = require("mongoose");
const TransactionSchema = require("./Transaction").schema;
const Transaction = require("./Transaction");
const Block = require("./Block");
const User = require("./User");

const blockchainMethods = {
  createGenesisBlock: function (user) {
    this.chain = new Block({
      transactions: [
        new Transaction({
          fromName: "Coinbase",
          fromAddress: null,
          toAddress: user.publicKey,
          toName: user.name,
          amount: 1000,
        }),
      ],
    });
  },

  getLatestBlock: function () {
    return this.chain[this.chain.length - 1];
  },

  mineBlock: function () {
    const newBlock = new Block({
      transactions: this.pendingTransactions,
      previousHash: this.getLatestBlock().hash,
    });

    console.log("mining Block...");
    // use the set previousHash in order to calculate the new block hash
    while (
      newBlock.hash.substring(0, this.difficulty) !==
      new Array(this.difficulty).fill(0).join("")
    ) {
      // the nonce value only changes when trying to add a new block to the blockchain
      // it stays constant when trying to recalculate hash (so verifying will not be a problem)
      newBlock.nonce++;
      newBlock.hash = newBlock.calculateHash();
    }

    // add block to the end of the chain
    this.chain.push(newBlock);

    this.pendingTransactions = [
      new Transaction({
        fromName: "Coinbase",
        fromAddress: null,
        toAddress: "12345",
        toName: "Zeyad The Miner",
        amount: 100,
      }),
    ];
    console.log("block added");
  },

  addTransaction: function (transaction) {
    if (
      (!transaction.fromAddress && !transaction.fromName) ||
      !transaction.toAddress
    ) {
      throw new Error("this transaction requires from/toAddress");
    }

    if (!transaction.isValid()) {
      throw new Error("this transaction is not valid");
    }

    this.pendingTransactions.push(transaction);
  },

  getBalance: function (balanceAddress) {
    if (!this.isChainValid()) {
      throw new Error("The Blockchain has been tampered with abort!");
    }

    let balance = 0;
    for (const block of this.chain) {
      for (const transaction of block.transactions) {
        if (transaction.fromAddress === balanceAddress) {
          balance -= transaction.amount;
        } else if (transaction.toAddress === balanceAddress) {
          balance += transaction.amount;
        }
      }
    }

    return balance;
  },

  isChainValid: function () {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      // check if any calculated hashes don't equal the targeted difficulty hash
      if (
        currentBlock.hash.substring(0, this.difficulty) !==
        new Array(this.difficulty).fill(0).join("")
      ) {
        return false;
      }

      if (!currentBlock.hasValidTransactions()) {
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
  },
};

const BlockchainSchema = new mongoose.Schema(
  {
    difficulty: {
      type: Number,
      default: 4,
    },
    identifier: {
      type: String,
      default: "tawsifCoin",
    },
    miningReward: {
      type: Number,
      default: 100,
    },
    pendingTransactions: {
      type: [TransactionSchema],
      default: [],
    },
    chain: {
      type: [BlockSchema],
      default: [],
    },
  },
  {
    methods: blockchainMethods,
  }
);

module.exports =
  mongoose.models.Blockchain || mongoose.model("Blockchain", BlockchainSchema);
