const { Router } = require("express");
const db = require("../../../db2/models");

const { User: UserModel, Address: AddressModel } = db;

const userRouter_address = new Router({ mergeParams: true });

userRouter_address.post("/", async (req, res) => {
  const { id } = req.params;
  const { name, street, city, country } = req.body;

  if (!street || !name || !city || !country) return res.status(400).json({ error: "Address data missing" });

  try {
    const user = await UserModel.findOne({ where: { id } });
    if (!user) return res.status(400).json({ error: "User not found" });

    const data = await AddressModel.create({ name, street, city, country, userId: id });
    return res.json({ data });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

userRouter_address.get("/", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findOne({ where: { id } });
    if (!user) return res.status(400).json({ error: "User not found" });

    const data = await AddressModel.findAll({ where: { userId: id } });
    return res.json({ data });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

userRouter_address.get("/:addrId", async (req, res) => {
  const { id, addrId } = req.params;

  try {
    const addr = await AddressModel.findOne({ where: { userId: id, id: addrId }, include: [{ model: UserModel }] });
    if (!addr) return res.status(400).json({ error: "Address not found" });

    return res.json({ data: addr });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

userRouter_address.put("/:addrId", async (req, res) => {
  const { id, addrId } = req.params;

  const { name, street, city, country } = req.body;

  const updationObj = {};
  if (name) updationObj.name = name;
  if (street) updationObj.street = street;
  if (country) updationObj.country = country;
  if (city) updationObj.city = city;

  if (!Object.keys(updationObj).length) {
    return res.status(400).json({
      error: "Update fields cannot be empty",
    });
  }

  try {
    const user = await UserModel.findOne({ where: { id } });
    if (!user) return res.status(400).json({ error: "User not found" });

    const data = await AddressModel.update(updationObj, { where: { userId: id, id: addrId } });
    return res.json({ data });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

module.exports = userRouter_address;
