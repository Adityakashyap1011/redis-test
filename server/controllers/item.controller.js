import Item from "../models/items.models.js";
import redisClient from "../config/redis.js";


export const createItem= async(req,res)=>{
    try{
        const {name, price}=req.body;
        const item=Item.create({name,price});
        return res.status(201).json({message:"Item created successfully", item});
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to create item",
            error: error.message
        })
  }
}

export const getItemById= async(req,res)=>{
    try{
        const id=req.params.id;
        const key=`item:${id}`;

        const item=await redisClient.get(key);
        if(item){
            return res.status(200).json({message:"Item fetched from cache", item:JSON.parse(item)});
        }
        const itemFromDB= await Item.findById(id);
        if(!itemFromDB){
            return res.status(404).json({message:"Item not found"});
        }
        const str= JSON.stringify(itemFromDB)
        await redisClient.set(key,str,"EX",3600)
        return res.status(200).json({message:"Item fetched from database", item: itemFromDB});
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to fetch item",
            error: error
        })
    }
}

export const updateItemById= async(req,res)=>{
    try{
        const id=req.params.id;
        const {name, price}=req.body;
        const key=`item:${id}`;
        const itemFromDB= await Item.findById(id);
        if(!itemFromDB){
            return res.status(404).json({message:"Item not found"});
        }
        itemFromDB.name=name||itemFromDB.name;
        itemFromDB.price=price||itemFromDB.price;
        const updatedItem= await itemFromDB.save();
        await redisClient.del(key);
        return res.status(200).json({message:"Item updated successfully", item: updatedItem});  
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to update item",
            error: error.message
        })
    }
}