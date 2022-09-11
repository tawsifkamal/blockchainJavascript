const Blockchain = require('../models/Blockchain');

export const mineBlock = async () => {
  const tawsifCoin = await Blockchain.findOne({identifier: "tawsifCoin"});
  tawsifCoin.mineBlock();
  return tawsifCoin.save();
}