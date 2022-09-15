const { updateBlockchain } = require("../../../lib/controllers/blockchain");
import dbConnect from "../../../lib/utils/dbConnect";

export default async function handler(req, res) {
  const method = req.method;

  await dbConnect();

  switch (method) {
    case "PUT":
      try {
        const difficulty = req.body.difficulty;
        const miningReward = req.body.miningReward;

        const response = await updateBlockchain(difficulty, miningReward);

        res.status(200).json(response);
      } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
      }
      break;
  }
}
