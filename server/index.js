import { config } from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";

import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";

config();
const app = express();

app.use(
  cors({
    origin: "https://haven-post-client.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);
app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/uploads");
  },
  filename: function (req, file, cb) {
    file.originalname = file.originalname.replace(/\s/g, "");
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.listen(8000, () => {
  console.log("Server running on port 8000!");
});
