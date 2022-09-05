const mongoose = require('mongoose');
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

export const generateKeys = () => {
  const keyPair = ec.genKeyPair();
  const publicKey = keyPair.getPublic("hex");
  const privateKey = keyPair.getPrivate("hex");
  return { publicKey, privateKey };
};

export const getFromPrivateKey = (privateKey) => {
  return ec.keyFromPrivate(privateKey);
};

const UserSchema = mongoose.Schema({
  name: String,
  publicKey: String,
  privateKey: String,
})

module.exports =
  mongoose.models.User || mongoose.model("User", UserSchema);