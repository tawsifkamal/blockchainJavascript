import { getAllUsersBalance } from "../../../lib/controllers/user";

export default async function handler(req, res) {
  try {
    const response = await getAllUsersBalance();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
