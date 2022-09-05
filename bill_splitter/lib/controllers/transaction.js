const Transaction = require("../models/Transaction");
const Blockchain = require("../models/Blockchain");
const { getFromPrivateKey } = require("../utils/keys");

export const createTransaction = async (transactionDetails, privateKey) => {
  const transaction = new Transaction({
    fromAddress: transactionDetails.fromAddress,
    toAddress: transactionDetails.toAddress,
    amount: transactionDetails.amount,
  });

  const keyPair = getFromPrivateKey(privateKey);
  let tawsifCoin = await Blockchain.findOne({ identifier: "tawsifCoin" });
  transaction.signTransaction(keyPair);
  tawsifCoin.addTransaction(transaction);
  return tawsifCoin.save();
};
