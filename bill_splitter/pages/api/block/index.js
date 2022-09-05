const { mineBlock } = require("../../../lib/controllers/block");

export default async function handler(req, res) {
  const method = req.method;

  switch (method) {
    case "POST":
      try {
        const minerAddress = req.minerAddress;
        const response = await mineBlock(minerAddress);
        res.status(201).json(response);
      } catch (error) {
        console.log(error);
        res.status(500).send(error);
      }
      break;
  }
}
