const Transaction = require("../models/Transaction");
const { getBlockchain } = require("./blockchain");
const { getFromPrivateKey } = require("../utils/keys");

export const createTransaction = async (transactionDetails, privateKey) => {
  const tawsifCoin = await getBlockchain();
  const currentBalance = tawsifCoin.getBalance(transactionDetails.fromAddress);

  if (currentBalance - transactionDetails.amount < 0) {
    throw new Error("insufficient funds!");
  }

  const transaction = new Transaction({
    fromName: transactionDetails.fromName,
    fromAddress: transactionDetails.fromAddress,
    toName: transactionDetails.toName,
    toAddress: transactionDetails.toAddress,
    amount: transactionDetails.amount,
  });

  const keyPair = getFromPrivateKey(privateKey);

  transaction.signTransaction(keyPair);
  tawsifCoin.addTransaction(transaction);
  return tawsifCoin.save();
};
