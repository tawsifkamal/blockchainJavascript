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

export const updateBlockchain = async (difficulty, miningReward) => {
  return Blockchain.findOneAndUpdate(
    { identifier: "tawsifCoin" },
    {
      difficulty: difficulty ? difficulty : 4,
      miningReward: miningReward ? miningReward : 100,
    },
    { returnDocument: "after" }
  );
};

export const deleteBlockchain = async () => {
  return Blockchain.deleteOne({});
};
