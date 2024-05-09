const { Router } = require("express");
const db = require("../../../db2/models");

const { user: UserModel, UserRole: UserRolesModel, Role: RolesModel } = db;

const userRouter_roles = Router({ mergeParams: true });

userRouter_roles.post("/", async (req, res) => {
  const { id } = req.params;
  const { roleId } = req.body;

  try {
    const user = await UserModel.findOne({ id });
    if (!user) return res.status(400).json({ error: "User does not exist" });

    const data = await UserRolesModel.create({ userId: user.id, roleId: roleId });
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

userRouter_roles.get("/", async (req, res) => {
  const { id } = req.params;

  try {
    const data = await UserRolesModel.findAll({ where: { userId: id }, include: [{ model: RolesModel }, { model: UserModel }] });
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

userRouter_roles.put("/", async (req, res) => {
  const { id } = req.params;
  const { roles } = req.body;

  if (!Array.isArray(roles)) {
    return res.status(500).json({ error: "Invalid roles" });
  }
  for (const item of Object.values(roles)) {
    if (typeof item !== "string" || !validateUUID(item)) {
      return res.status(500).json({ error: "Invalid roles" });
    }
  }

  try {
    const data = await UserRolesModel.destroy({ where: { userId: id, id: { [Op.in]: roles } } });
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

module.exports = userRouter_roles;
