import jwt from "jsonwebtoken";
import { getDB } from "../config/db.js";


export const loginUser = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await getDB().collection("users").findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRES }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};

export const getJWT = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });

  const user = await getDB().collection("users").findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.TOKEN_EXPIRES,
    }
  );
  res.json({ token });
};

