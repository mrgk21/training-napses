const { Router } = require("express");
const db = require("../../db2/models/index.js");
const { Image: ImageModel, Comment: CommentModel } = db;

const imageRouter = new Router({ mergeParams: true });

imageRouter.post("/", async (req, res) => {
  const { url, height, width } = req.body;

  if (!url || !height || !width) return res.status(400).json({ error: "Invalid input" });

  try {
    const image = await ImageModel.create({ url, height, width });
    // const comment = await image.createComment({ text: "First" });
    // const image2 = await comment.getCommentable();

    return res.json({ data: image });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

imageRouter.post("/:id/comments", async (req, res) => {
  const { id } = req.params; // image id
  const { text } = req.body;

  if (!text) return res.status(400).json({ error: "Invalid input" });

  try {
    const image = await ImageModel.findOne({ id });
    if (!image) return res.status(400).json({ error: "image does not exist" });

    const comment = await image.createComment({ text });
    // const comment = await CommentModel.create({ text });
    await image.addComment(comment);

    return res.json({ data: comment });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

imageRouter.get("/:id/comments", async (req, res) => {
  const { id } = req.params; // image id

  try {
    const image = await ImageModel.findOne({ id });
    if (!image) return res.status(400).json({ error: "image does not exist" });

    const comments = await image.getComments();
    // const comments = await image.getComments({ include: [ImageModel] });

    return res.json({ data: comments });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

imageRouter.get("/:id/temp", async (req, res) => {
  const { id } = req.params; // comment id

  try {
    const comment = await CommentModel.findOne({ id });
    if (!comment) return res.status(400).json({ error: "comment does not exist" });

    const image = await comment.getImage();

    return res.json({ data: image });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

module.exports = imageRouter;
