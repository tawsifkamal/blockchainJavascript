import {
  createUser,
  deleteUser,
  getAllUsers,
} from "../../../lib/controllers/user";
import dbConnect from "../../../lib/utils/dbConnect";

export default async function handler(req, res) {
  const method = req.method;

  await dbConnect();

  switch (method) {
    case "GET":
      const response = await getAllUsers();
      res.status(200).json(response);
      break;
    case "POST":
      try {
        const name = req.body.name;

        const response = await createUser(name);
        if (response) {
          res.status(201).json(response);
        } else {
          res.status(400).send("user exists");
        }
      } catch (error) {
        console.log(error);
        res.status(500).send(error);
      }
      break;
    case "PUT":
      try {
        const username = req.body.username;
        const password = req.body.password;

        const response = await getUser(username, password);

        if (!response) {
          res.status(404).json(response);
        } else {
          res.status(200).json(response);
        }
      } catch (error) {
        console.log(error);
        res.status(500).send(error);
      }
      break;
    case "DELETE":
      try {
        const response = await deleteUser();
        res.status(202).json(response);
      } catch (error) {
        console.log(error);
        res.status(500).send(error);
      }
      break;
  }
}
