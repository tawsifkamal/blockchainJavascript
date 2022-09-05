import dbConnect from "../../lib/utils/dbConnect";
const Blockchain = require("../../lib/models/Blockchain");

export default async function handler(req, res) {
  const method = req.method;

  console.log("connecting to database");
  await dbConnect();
  console.log("connected");

  switch (method) {
    case "GET":
      try {
        let tawsifCoin;
        tawsifCoin = await Blockchain.find({});

        if (tawsifCoin.length === 0) {
          tawsifCoin = await Blockchain.create({});
          res.status(200).json(tawsifCoin);
        } else {
          res.status(200).json(tawsifCoin[0]);
        }
      } catch (error) {
        console.log(error);
        res.send("error");
      }
      break;
    case "POST":
      try {
        const blockchain = new Blockchain({
          pendingTransactions: [],
        });

        const result = await Blockchain.updateOne({}, blockchain, {
          upsert: true,
        });

        res.status(201).json(result);
        break;
      } catch (error) {
        console.log(error);
        break;
      }
  }
}
