import express from "express";
import {
  getAllBlogPosts,
  addNewBlogs,
  removeSingleBlogPost,
  updateBlogs,
} from "./../controller/blogPost.controller.js";
import multer from "multer";
import fs from "fs";

const router = express.Router();
// const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const fileDestination = `./image`;
    try {
      if (!fs.existsSync(fileDestination)) {
        fs.mkdirSync(fileDestination, { recursive: true });
      }
    } catch (error) {
      console.log(error);
    }

    cb(null, fileDestination);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-").replace(".", "-") +
        file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  //reject file
  // console.log(file)

  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limts: {
    fileSize: 1024 * 1024 * 1,
  },
  fileFilter: fileFilter,
});

router.get("/", getAllBlogPosts);
router.post("/create", upload.single("fileUpload"), addNewBlogs);
router.patch("/remove/:id", removeSingleBlogPost);
router.patch("/update/:id", upload.single("fileUpload"), updateBlogs);

export default router;
