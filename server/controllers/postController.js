import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const { category } = req.query;

  const query = category
    ? "SELECT * FROM posts WHERE category = ?"
    : "SELECT * FROM posts";

  db.query(query, [category], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const { id } = req.params;

  const query =
    "SELECT p.id, `username`, `profileImg`, `title`, `description`, `img`, `category`, `date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?";

  db.query(query, [id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {
  const { title, description, img, category, date } = req.body;

  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "havenPostSecretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token provided!");

    const query =
      "INSERT INTO posts(`title`, `description`, `img`, `category`, `uid`, `date`) VALUES (?)";
    const values = [title, description, img, category, userInfo?.id, date];

    db.query(query, [values], (error, data) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json("Post successfully created!");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "havenPostSecretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token provided!");

    const postId = req.params.id;
    const query = "DELETE FROM posts WHERE `id` = ? AND uid = ?";

    db.query(query, [postId, userInfo?.id], (error, data) => {
      if (error) return res.status(403).json("You can delete only your post!");

      return res.json("Post has been deleted!");
    });
  });
};

export const updatePost = (req, res) => {
  const { title, description, img, category } = req.body;
  const postId = req.params.id;

  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "havenPostSecretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token provided!");

    const query =
      "UPDATE posts SET `title`=?, `description`=?, `img`=?, `category`=? WHERE `id` = ? AND `uid` =?";
    const values = [title, description, img, category];

    db.query(query, [...values, postId, userInfo?.id], (error, data) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json("Post successfully updated!");
    });
  });
};
