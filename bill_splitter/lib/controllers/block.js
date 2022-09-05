const Blockchain = require('../models/Blockchain');

export const mineBlock = async (minerAddress) => {
  const tawsifCoin = await Blockchain.findOne({identifier: "tawsifCoin"});
  tawsifCoin.mineBlock(minerAddress);
  return tawsifCoin.save();
}