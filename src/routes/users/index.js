const { Router } = require("express");
const userRouter_id = require("./[id]/index.js");
const db = require("../../db2/models/index.js");

const { User: UserModel, Roles: RolesModel } = db;

const userRouter = Router({ mergeParams: true });
userRouter.use("/:id", userRouter_id);

userRouter.get("/", async (req, res) => {
  try {
    const data = await UserModel.findAll();
    return res.json({ data });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

userRouter.post("/", async (req, res) => {
  const { full_name, country_code } = req.body;

  if (!full_name || !country_code) {
    return res.status(400).json({ error: "User data missing" });
  }

  try {
    const data = await UserModel.create({ full_name, country_code });
    return res.json({ data });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

userRouter.get("/roles", async (req, res) => {
  const data = await RolesModel.findAll({});
  return res.json(data);
});

module.exports = userRouter;
