import { getBlockchain } from "./blockchain";

const User = require("../models/User");
const { generateKeys } = require("../utils/keys");

export const createUser = async (name) => {
  const { publicKey, privateKey } = generateKeys();
  const userExists = await User.findOne({ name });
  if (userExists) {
    return null;
  } else {
    const user = new User({ name, publicKey, privateKey });
    return User.create(user);
  }
};

export const loginUser = async (name, privateKey) => {
  let user = await User.findOne({ name, privateKey });
  if (!user) {
    return null;
  } else {
    return user;
  }
};

export const getAllUsers = async () => {
  return User.find({});
};

export const getAllUsersBalance = async () => {
  const tawsifCoin = await getBlockchain();
  const usersArray = await getAllUsers();

  return usersArray.map((user) => {
    const balance = tawsifCoin.getBalance(user.publicKey);
    return { name: user.name, publicKey: user.publicKey, balance: balance };
  });
};

export const deleteUser = async () => {
  return User.deleteOne({});
};
