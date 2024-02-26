import { db } from "../db.js";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

export const register = (req, res) => {
  const { email, username, password } = req.body;

  // Check existing user
  const query = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(query, [email, username], (err, data) => {
    if (err) return res.json(err);
    if (data.length) {
      return res.status(409).json("User already exists");
    }

    // Hash password and create user
    const hashedPassword = bcrypt.hashSync(password, 12);

    const query =
      "INSERT INTO users(`username`, `email`, `password`) VALUES (?)";
    const values = [username, email, hashedPassword];

    db.query(query, [values], (error, theData) => {
      if (error) return res.json(error);

      return res.status(200).json("User has been created.");
    });
  });
};

export const login = (req, res) => {
  const { username } = req.body;

  // Existing user
  const query = "SELECT * FROM users WHERE username = ?";

  db.query(query, [username], async (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    // Check password
    const isCorrectPassword = await bcrypt.compare(
      req.body.password || "",
      data[0].password
    );

    // Creating token
    if (isCorrectPassword) {
      const token = jwt.sign({ id: data[0].id }, "havenPostSecretKey");
      const { password, ...other } = data[0];

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(other);
    } else {
      return res.status(400).json("Wrong username or password!");
    }
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", { sameSite: "none", secure: true })
    .status(200)
    .json("Successfully logged out!");
};
