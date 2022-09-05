const SHA256 = require("crypto-js/sha256");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
const mongoose = require("mongoose");

// class Transaction {
//   constructor(fromAddress, toAddress, amount) {
//     this.fromAddress = fromAddress;
//     this.toAddress = toAddress;
//     this.amount = amount;
//   }

//   calculateHash() {
//     return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
//   }

//   signTransaction(signingKey) {
//     if (signingKey.getPublic("hex") !== this.fromAddress) {
//       throw new Error("You cannot spend someone elses coins!");
//     }

//     if (!signingKey.getPrivate()) {
//       throw new Error("a private key was not provided!");
//     }

//     const hashTx = this.calculateHash();
//     const signedKey = signingKey.sign(hashTx, "base64");
//     this.signature = signedKey.toDER("hex");
//   }

//   isValid() {
//     if (this.fromAddress === null) return true;

//     if (!this.signature || this.signature.length === 0) {
//       throw new Error("this transaction has not been signed");
//     }

//     const publicKey = ec.keyFromPublic(this.fromAddress, "hex");
//     return publicKey.verify(this.calculateHash(), this.signature); // checks if this hash was signed wi
//   }
// }

const transactionMethods = {
  calculateHash: function () {
    return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
  },

  signTransaction: function (signingKey) {
    if (signingKey.getPublic("hex") !== this.fromAddress) {
      throw new Error("You cannot spend someone elses coins!");
    }

    if (!signingKey.getPrivate()) {
      throw new Error("a private key was not provided!");
    }

    const hashTx = this.calculateHash();
    const signedKey = signingKey.sign(hashTx, "base64");
    this.signature = signedKey.toDER("hex");
  },

  isValid: function () {
    if (this.fromAddress === null) return true;

    if (!this.signature || this.signature.length === 0) {
      throw new Error("this transaction has not been signed");
    }

    const publicKey = ec.keyFromPublic(this.fromAddress, "hex");
    return publicKey.verify(this.calculateHash(), this.signature); // checks if this hash was signed wi
  },
};

const TransactionSchema = mongoose.Schema(
  {
    fromAddress: String,
    toAddress: String,
    amount: Number,
  },

  { methods: transactionMethods }
);

module.exports =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);
