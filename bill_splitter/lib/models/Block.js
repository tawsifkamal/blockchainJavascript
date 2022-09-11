const { SHA256 } = require("crypto-js");
const mongoose = require("mongoose");
const TransactionSchema = require("./Transaction").schema;


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
    transactions: {
      type: [TransactionSchema],
      default: [],
    },
    previousHash: {
      type: String,
      default: "000000000000",
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
