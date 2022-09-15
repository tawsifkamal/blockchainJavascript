const SHA256 = require("crypto-js/sha256");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
const mongoose = require("mongoose");

const transactionMethods = {
  calculateHash: function () {
    return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
  },

  signTransaction: function (signingKey) {
    if (this.fromAddress === null) return;

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
    fromName: String,
    fromAddress: String,
    toName: String,
    toAddress: String,
    amount: Number,
    signature: {
      type: String,
      default: null,
    },
  },

  { methods: transactionMethods }
);

module.exports =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);
