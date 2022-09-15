const Transaction = require("../models/Transaction");
const { getBlockchain } = require("./blockchain");
const { getFromPrivateKey } = require("../utils/keys");

export const createTransaction = async (transactionDetails, privateKey) => {
  const tawsifCoin = await getBlockchain();
  const currentBalance = tawsifCoin.getBalance(transactionDetails.fromAddress);
  let { fromName, fromAddress, toName, toAddress, amount } = transactionDetails;

  if (fromAddress && currentBalance - transactionDetails.amount < 0) {
    throw new Error("insufficient funds!");
  }

  const transaction = new Transaction({
    fromName: fromName,
    fromAddress: fromAddress,
    toName: toName,
    toAddress: toAddress,
    amount: amount,
  });

  const keyPair = getFromPrivateKey(privateKey);

  transaction.signTransaction(keyPair);
  tawsifCoin.addTransaction(transaction);
  return tawsifCoin.save();
};
