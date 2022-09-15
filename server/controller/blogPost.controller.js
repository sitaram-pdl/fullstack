"use-strict";
import express from "express";
import mongoose from "mongoose";
import BlogPost from "./../models/blogs.js";
import fs from "fs";

const router = express.Router();

export const getAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();

    res.status(200).json(blogPosts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addNewBlogs = async (req, res) => {
  const { title, description } = req.body;
  const fileUpload = req.file ? req.file.path : undefined;

  const createNewPost = new BlogPost({
    title,
    description,
    fileUpload,
  });

  try {
    await createNewPost.save();
    res.status(200).json(createNewPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const removeSingleBlogPost = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`post ${id} not found`);
  try {
    const bp = await BlogPost.findByIdAndRemove(id);
    fs.unlinkSync(bp.fileUpload);
  } catch (error) {
    console.log(error);
  }

  // await BlogPost.findByIdAndRemove(id);

  res.json({ message: "Successfully deleted" });
};

export const updateBlogs = async (res, req) => {
  console.log(req.body);
  console.log(req);

  return;
  const { title, description } = req.body;
  const fileUpload = req.file ? req.file.path : undefined;
  console.log(title, description);
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`post ${id} not found`);

  try {
    const bp = await BlogPost.findOneAndUpdate(id, {
      title,
      description,
      fileUpload,
    });
    fs.unlinkSync(bp.fileUpload);
  } catch (error) {
    fs.unlinkSync(fileUpload);
  }

  try {
    const { title, description } = req.body;
    console.log(title, "dcfvghjk");
  } catch (error) {
    // console.log(title, "dcfvghjk");
  }
};

export default router;
