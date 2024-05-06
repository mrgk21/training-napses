import { Router } from "express";
import { AadharCard } from "../../db2/models/AadharCard.model.js";
import { Address } from "../../db2/models/Address.model.js";
import { User } from "../../db2/models/User.model.js";

const userRouter: Router = Router();

userRouter.get("/", async (req, res) => {
	try {
		const data = await User.findAll();
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
		const data = await User.create({ full_name, country_code });
		return res.json({ data });
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
});

userRouter.get("/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const user = await User.findOne({ where: { id }, include: AadharCard });
		if (!user) return res.status(400).json({ error: "User not found" });

		return res.json({ data: user });
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
});

userRouter.put("/:id", async (req, res) => {
	const { id } = req.params;
	const { full_name, country_code } = req.body;

	const updationObj: { [k: string]: string } = {};
	if (full_name) updationObj.full_name = full_name;
	if (country_code) updationObj.country_code = country_code;

	if (!Object.keys(updationObj).length) {
		return res.status(400).json({
			error: "Update fields cannot be empty",
		});
	}

	try {
		await User.update(updationObj, { where: { id } });
		return res.sendStatus(201);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
});

userRouter.delete("/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const user = (await User.findOne({ where: { id } }))?.toJSON();
		await Address.destroy({ where: { userId: id } });
		await User.destroy({ where: { id } });
		await AadharCard.destroy({ where: { id: user.aadharId } });
		return res.sendStatus(201);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
});

userRouter.post("/:id/aadhar", async (req, res) => {
	const { id } = req.params;
	const { aadharNumber, name } = req.body;

	if (!aadharNumber || !name) {
		return res.status(400).json({ error: "User data missing" });
	}

	const user = await User.findOne({ where: { id } });
	if (!user) return res.status(400).json({ error: "User not found" });

	try {
		const data = (await AadharCard.create({ aadharNumber, name })).toJSON();
		await User.update({ aadharId: data.id }, { where: { id } });
		return res.json({ data });
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
});

userRouter.get("/:id/aadhar", async (req, res) => {
	const { id } = req.params;

	const user = (await User.findOne({ where: { id } }))?.toJSON();
	if (!user) return res.status(400).json({ error: "User not found" });
	if (!user.aadharId) return res.status(400).json({ error: "User aadhar card not found" });

	try {
		const data = await AadharCard.findOne({ where: { id: user.aadharId } });
		return res.json({ data });
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
});

userRouter.post("/:id/address", async (req, res) => {
	const { id } = req.params;
	const { name, street, city, country } = req.body;

	if (!street || !name || !city || !country) return res.status(400).json({ error: "Address data missing" });

	try {
		const user = await User.findOne({ where: { id } });
		if (!user) return res.status(400).json({ error: "User not found" });

		const data = await Address.create({ name, street, city, country, userId: id });
		return res.json({ data });
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
});

userRouter.get("/:id/address", async (req, res) => {
	const { id } = req.params;

	try {
		const user = await User.findOne({ where: { id } });
		if (!user) return res.status(400).json({ error: "User not found" });

		const data = await Address.findAll({ where: { userId: id } });
		return res.json({ data });
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
});

userRouter.get("/:id/address/:addrId", async (req, res) => {
	const { id, addrId } = req.params;

	try {
		const addr = await Address.findOne({ where: { userId: id, id: addrId } });
		if (!addr) return res.status(400).json({ error: "Address not found" });

		return res.json({ data: addr });
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
});

userRouter.put("/:id/address/:addrId", async (req, res) => {
	const { id, addrId } = req.params;

	const { name, street, city, country } = req.body;

	const updationObj: { [k: string]: string } = {};
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
		const user = await User.findOne({ where: { id } });
		if (!user) return res.status(400).json({ error: "User not found" });

		const data = await Address.update(updationObj, { where: { userId: id, id: addrId } });
		return res.json({ data });
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
});

export { userRouter };
