const { getBlockchain, deleteBlockchain } = require("../../../lib/controllers/blockchain");
import dbConnect from '../../../lib/utils/dbConnect';

export default async function handler(req, res) {
  const method = req.method;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const response = await getBlockchain();
        res.status(200).json(response);
      } catch(error) {
        res.error(error);
      }
      break;
    case "DELETE":
      try {
        const response = await deleteBlockchain();
        res.status(202).json(response);
      } catch(error) {
        console.log(error);
        res.error(error);
      }
      break;
  }
}
