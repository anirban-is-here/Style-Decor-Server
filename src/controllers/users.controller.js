import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";


export const getUsers = async (req, res) => {
  try {
    const users = await getDB().collection("users").find({}).toArray();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

export const addUser = async (req, res) => {
  try {
    const result = await getDB().collection("users").insertOne(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Insert failed" });
  }
};


export const getCurrentUser = async (req, res) => {
  try {
    const user = await getDB()
      .collection("users")
      .findOne({ _id: new ObjectId(req.user.id) });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user" });
  }
};
