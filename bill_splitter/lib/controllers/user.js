const User = require("../models/User");
const { generateKeys, getFromPrivateKey } = require("../utils/keys");

export const createUser = async (name) => {
    const { publicKey, privateKey } = generateKeys();
    const userExists = await User.findOne({name});
    if (userExists) {
      return null;
    } else {
      const user = new User({ name, publicKey, privateKey });
      return User.create(user);
    }
};

export const loginUser = async (name, privateKey) => {
  let user = await User.findOne({username, privateKey});
  if (user.length === 0) {
    return null;
  } else {
    return user[0];
  }
}

export const getAllUsers = async () => {
  return User.find({});
}

export const deleteUser = async () => {
  return User.deleteOne({});
};
