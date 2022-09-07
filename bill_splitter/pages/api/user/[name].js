const {loginUser} = require('../../../lib/controllers/user');

export default async function handler(req, res) {
  const {name, privateKey} = req.query;
  const response = await loginUser(name, privateKey);

  if (!response) {
    res.status(401).send("Name/PrivateKey doesn't match!");
  } else {
    res.status(200).json(response);
  }
}