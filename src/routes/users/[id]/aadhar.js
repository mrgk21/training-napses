const { Router } = require("express");
const db = require("../../../db2/models");
const { User: UserModel } = db;

const userRouter_aadhar = new Router({ mergeParams: true });

userRouter_aadhar.post("/", async (req, res) => {
  const { id } = req.params;
  const { aadharNumber, name } = req.body;

  if (!aadharNumber || !name) return res.status(400).json({ error: "User data missing" });

  try {
    const user = await UserModel.findOne({ where: { id } });
    if (!user) return res.status(400).json({ error: "User not found" });
    if (user.aadharId) return res.status(400).json({ error: "User aadhar already exists" });

    // const data = await AadharCardModel.create({ aadharNumber, name });
    // await UserModel.update({ aadharId: data.id }, { where: { id } });

    const data = await user.createAadharCard({ aadharNumber, name });
    return res.json({ data });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

userRouter_aadhar.get("/", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findOne({ where: { id } });
    if (!user) return res.status(400).json({ error: "User not found" });
    if (!user.aadharId) return res.status(400).json({ error: "User aadhar card not found" });

    const data = await user.getAadharCard();
    return res.json({ data });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

module.exports = userRouter_aadhar;
