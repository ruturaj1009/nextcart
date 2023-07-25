import productModel from "../models/productModel.js";
import slugify from "slugify";
import fs from 'fs';


export const createProductcontroller = async(req,res)=>{
    try {
        const {name,description,price,category,quantity} = req.fields;
        const {photo} = req.files;
        switch (true) {
            case !name:
                return res.status(500).send({error:'Name is Required'})
            case !description:
                return res.status(500).send({error:'Description is Required'})
            case !price:
                return res.status(500).send({error:'price is Required'})
            case !category:
                return res.status(500).send({error:'category is Required'})
            case !quantity:
                return res.status(500).send({error:'quantity is Required'})
            case photo && photo.size > 1000000:
                return res.status(500).send({error:'photo is Required '})
        }

        const product = new productModel({...req.fields,slug:slugify(name)});
        if(photo){
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }
        await product.save();
        res.status(201).send({
            success:true, 
            message:'Successfully added Product',
            product,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in creating Product',
            error,
        })
    }
}