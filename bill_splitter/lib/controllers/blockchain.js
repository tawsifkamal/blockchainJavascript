const Blockchain = require("../../lib/models/Blockchain");

export const getBlockchain = async () => {
  let tawsifCoin;
  tawsifCoin = await Blockchain.find({});

  if (tawsifCoin.length === 0) {
    tawsifCoin = await Blockchain.create({});
    return tawsifCoin;
  } else {
    return tawsifCoin[0];
  }
};

export const deleteBlockchain = async () => {
  return Blockchain.deleteOne({});
};
