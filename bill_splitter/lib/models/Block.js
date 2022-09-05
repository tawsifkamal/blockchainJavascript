const { SHA256 } = require("crypto-js");
const mongoose = require("mongoose");
const TransactionSchema = require("./Transaction").schema;

// class Block {
//   constructor(timestamp, transactions, previousHash = "") {
//     this.timestamp = timestamp;
//     this.transactions = transactions;
//     this.previousHash = previousHash;
//     this.hash = this.calculateHash();
//     this.nonce = 0;
//   }

//   /**
//    * Method calculates hash of current block
//    */
//   calculateHash() {
//     return SHA256(
//       this.index +
//         this.previousHash +
//         this.timestamp +
//         JSON.stringify(this.data) +
//         this.nonce
//     ).toString();
//   }

//   hasValidTransactions() {
//     for (const transaction of this.transactions) {
//       // this will check if each public key has been signed by the correct private key
//       if (!transaction.isValid()) {
//         return false;
//       }
//     }

//     return true;
//   }
// }

const blockMethods = {
  calculateHash: function () {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
    ).toString();
  },

  hasValidTransactions: function () {
    for (const transaction of this.transactions) {
      // this will check if each public key has been signed by the correct private key
      if (!transaction.isValid()) {
        return false;
      }
    }

    return true;
  },
};

const BlockSchema = mongoose.Schema(
  {
    timestamp: {
      type: String,
      default: () => Date.now().toString(),
    },
    transactions: [TransactionSchema],
    previousHash: {
      type: String,
      default: "",
    },
    hash: {
      type: String,
      default: blockMethods.calculateHash,
    },
    nonce: {
      type: Number,
      default: 0,
    },
  },
  {
    methods: blockMethods,
  }
);

module.exports = mongoose.models.Block || mongoose.model("Block", BlockSchema);
