const { createTransaction } = require("../../../lib/controllers/transaction");
import dbConnect from "../../../lib/utils/dbConnect";
export default async function handler(req, res) {
  const method = req.method;

  await dbConnect();

  switch (method) {
    case "GET":
      break;
    case "POST":
      try {
        const transactionDetails = req.body.transactionDetails;
        const privateKey = req.body.privateKey;

        const response = await createTransaction(
          transactionDetails,
          privateKey
        );

        res.status(201).json(response);
      } catch (error) {
        if (error.message === "insufficient funds!") {
          res.status(400).send(error);
        } else {
          res.status(500).send(error);
        }
        
      }
      break;
  }
}
