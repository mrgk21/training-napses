const { Router } = require("express");
const userRouter_aadhar = require("./aadhar");
const userRouter_address = require("./address");
const userRouter_roles = require("./roles");

const db = require("../../../db2/models");
const { User: UserModel, Address: AddressModel, AadharCard: AadharCardModel } = db;

const userRouter_id = new Router({ mergeParams: true });
userRouter_id.use("/aadhar", userRouter_aadhar);
userRouter_id.use("/address", userRouter_address);
userRouter_id.use("/roles", userRouter_roles);

userRouter_id.get("/", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findOne({ where: { id }, include: [{ model: AadharCardModel }] });
    if (!user) return res.status(400).json({ error: "User not found" });

    return res.json({ data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

userRouter_id.put("/", async (req, res) => {
  const { id } = req.params;
  const { full_name, country_code } = req.body;

  const updationObj = {};
  if (full_name) updationObj.full_name = full_name;
  if (country_code) updationObj.country_code = country_code;

  if (!Object.keys(updationObj).length) {
    return res.status(400).json({
      error: "Update fields cannot be empty",
    });
  }

  try {
    await UserModel.update(updationObj, { where: { id } });
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

userRouter_id.delete("/", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findOne({ wehere: { id } });
    await AddressModel.destroy({ where: { userId: id } });
    await UserModel.destroy({ where: { id } });
    await AadharCardModel.destroy({ where: { id: user.aadharId } });
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

module.exports = userRouter_id;
