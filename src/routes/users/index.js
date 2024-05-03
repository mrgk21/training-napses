import { Router } from "express";
import AadharCardModel from "../../db/models/AadharCard.js";
import UserModel from "../../db/models/User.js";

const userRouter = Router()

userRouter.get("/", async (req, res) => {
    try {
        const data = await UserModel.findAll();
        return res.json({data});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
        
    }
})

userRouter.post("/", async (req, res) => {
    const {name, email, mobile} = req.body;

    if(!name || !email || !mobile) {
        return res.status(400).json({error: "User data missing"})
    }

    try {
        const data = await UserModel.create({name, email, mobile});
        return res.json({data})
        
    } catch (error) {
        console.log(error); 
        return res.status(500).json(error);
        
    }
})

userRouter.get("/:id", async (req, res) => {
    const {id} = req.params;
    
    try {
        const user = await UserModel.findOne({where: { id }});
        if(!user) return res.status(400).json({error: "User not found"});

        return res.json({data: user});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
        
    }
})

userRouter.put("/:id", async (req, res) => {
    const {id} = req.params;
    const {name, mobile, email} = req.body;
    
    const updationObj = {};
    if(name) updationObj.name = name;
    if(mobile) updationObj.mobile = mobile;
    if(email) updationObj.email = email;

    if(!Object.keys(updationObj).length) {
        return res.status(400).json({
            error: "Update fields cannot be empty"
        })
    }

    try {
        await UserModel.update(updationObj, {where: { id }})
        return res.sendStatus(201)
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
        
    }
})

userRouter.post("/:id/aadhar", async (req, res) => {
    const {id} = req.params;
    const {aadharNumber, name} = req.body;
    
    if(!aadharNumber || !name) {
        return res.status(400).json({error: "User data missing"})
    }

    const user = await UserModel.findOne({where: {id, name}});
    if(!user) return res.status(400).json({error: "User not found"});

    try {

            console.log({user});
        const data = await AadharCardModel.create({aadharNumber, name});
        await UserModel.update({aadharId: data.id}, {where: { id }})
        

        return res.json({data});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
        
    }
})

export default userRouter;


