"use strict";
import express from "express";
// import bodyParser from "body-parse";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import blogPosts from "./routes/blogs.routes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(upload.array());
// app.use(express.static("public"));
// app.use(express.static(__dirname + "/public"));
app.use("/image", express.static("image"));
app.use(cors());

const allowedDomains = ["http://localhost:", "127.0.0.1:6000"];
// process.env.MODE === "DEVELOPMENT"
//   ? [
//       "http://www.leafplus.getengineeringtroop.com",
//       "http://leafplus.getengineeringtroop.com",
//       "http://localhost:3000",
//       "http://localhost:3001",
//       "http://127.0.0.1:3000",
//       "http://192.168.1.64:3000",
//       "http://192.168.1.73:3000",
//       "http://192.168.1.88:3000",
//       "http://192.168.247.207:3000",
//     ]
//   : ["production client url"];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  console.log(req.header);

  if (allowedDomains.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  console.log("origin", origin);

  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/api/blogs", blogPosts);

const PORT = process.env.PORT || 6000;

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server is running at: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(error));
