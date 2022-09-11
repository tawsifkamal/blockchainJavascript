const Blockchain = require("../models/Blockchain");
import { createUser } from "./user";

export const getBlockchain = async () => {
  let tawsifCoin;
  tawsifCoin = await Blockchain.findOne({ identifier: "tawsifCoin" });

  if (!tawsifCoin) {
    const tawsifUser = await createUser("Tawsif");
    tawsifCoin = await Blockchain.create({});
    tawsifCoin.createGenesisBlock(tawsifUser);
    return tawsifCoin.save();
  } else {
    return tawsifCoin;
  }
};

export const deleteBlockchain = async () => {
  return Blockchain.deleteOne({});
};
