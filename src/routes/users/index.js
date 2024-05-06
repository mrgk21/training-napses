const {Router} = require("express")
const {user: UserModel, address: AddressModel, AadharCard: AadharCardModel} = require("src/db2/models/index.js");

const userRouter = Router();

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
    const {full_name, country_code} = req.body;

    if(!full_name || !country_code) {
        return res.status(400).json({error: "User data missing"})
    }

    try {
        const data = await UserModel.create({full_name, country_code});
        return res.json({data})
        
    } catch (error) {
        console.log(error); 
        return res.status(500).json(error);
        
    }
})

userRouter.get("/:id", async (req, res) => {
    const {id} = req.params;
    
    try {
        const user = await UserModel.findOne({where: { id }, include: AadharCardModel });
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

userRouter.delete("/:id", async (req, res) => {
    const {id} = req.params;

    console.log({id});

    try {
        const user = await UserModel.findOne({wehere: {id}})
        await AddressModel.destroy({where: {userId: id}})
        await UserModel.destroy({where: { id }});
        await AadharCardModel.destroy({where: {id: user.aadharId}})
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

    const user = await UserModel.findOne({where: {id}});
    if(!user) return res.status(400).json({error: "User not found"});

    try {

        const data = await AadharCardModel.create({aadharNumber, name});
        await UserModel.update({aadharId: data.id}, {where: { id }})
        return res.json({data});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
        
    }
})

userRouter.get("/:id/aadhar", async (req, res) => {
    const {id} = req.params;

    const user = await UserModel.findOne({where: {id}});
    if(!user) return res.status(400).json({error: "User not found"});
    if(!user.aadharId) return res.status(400).json({error: "User aadhar card not found"});

    try {
        const data = await AadharCardModel.findOne({where: {id: user.aadharId}});
        return res.json({data})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
        
    }
})

userRouter.post("/:id/address", async (req, res) => {
    const {id} = req.params;
    const {name, street, city, country} = req.body;
    
    if(!street || !name || !city || !country)
        return res.status(400).json({error: "Address data missing"})
   
    try {
        const user = await UserModel.findOne({where: {id}});
        if(!user) return res.status(400).json({error: "User not found"});
 
        const data = await AddressModel.create({name, street, city, country, userId: id});
        return res.json({data});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);        
    }
})

userRouter.get("/:id/address", async (req, res) => {
    const {id} = req.params;
    
    try {
        const user = await UserModel.findOne({where: {id}});
        if(!user) return res.status(400).json({error: "User not found"});

        const data = await AddressModel.findAll({where: {userId: id}});
        return res.json({data})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
        
    }
})

userRouter.get("/:id/address/:addrId", async (req, res) => {
    const {id, addrId} = req.params;
   
    try {
        const addr = await AddressModel.findOne({where: {userId: id, id: addrId}});
        if(!addr) return res.status(400).json({error: "Address not found"});

        return res.json({data: addr});
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);        
    }
})

userRouter.put("/:id/address/:addrId", async (req, res) => {
    const {id, addrId} = req.params;

    const {name, street, city, country} = req.body;
    
    const updationObj = {};
    if(name) updationObj.name = name;
    if(street) updationObj.street = street;
    if(country) updationObj.country = country;
    if(city) updationObj.city = city;

    if(!Object.keys(updationObj).length) {
        return res.status(400).json({
            error: "Update fields cannot be empty"
        })
    }

    try {
        const user = await UserModel.findOne({where: {id}});
        if(!user) return res.status(400).json({error: "User not found"});

        const data = await AddressModel.update(updationObj, {where: {userId: id, id: addrId}});
        return res.json({data})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
        
    }
})

module.exports = userRouter;
