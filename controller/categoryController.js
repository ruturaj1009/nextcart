import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategorycontroller = async (req,res)=>{
    try {
        const {name} = req.body;
        if(!name){
            return res.status(401).send({message:'Name is required'})
        }
        const existingCategory = await categoryModel.findOne({name});
        if(existingCategory){
            return res.status(200).send({
                success: true,
                message:'Category Already Exists'
            });
        }
        const category = await new categoryModel({
            name,
            slug:slugify(name),
        }).save();
        res.status(201).send({
            success: true,
            message:'New Category Created Successfully.',
            category
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Eoor in Category',
            error,
        })
    }
};

export const updateCategorycontroller = async (req,res)=>{
    try {
        const {name} = req.body;
        const {id} = req.params;
        const category = await categoryModel.findByIdAndUpdate(id,{name, slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message:'Category Updated Successfully',
            category
        })
        
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error while updating Category',
            error,
        })
    }
};

export const allCategorycontoller = async(req,res)=>{
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success:true,
            message:'Categories fetched Successfully',
            category
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error while fetching Category',
            error,
        })
    }
};

export const singleCategorycontoller = async(req,res)=>{
    try {
        const {slug} = req.params;
        const category = await categoryModel.findOne({slug});
        res.status(200).send({
            success:true,
            message:'Category fetched Successfully',
            category
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error while fetching Category',
            error,
        })
    }
};

export const deleteCategorycontroller = async(req,res)=>{
    try {
        const {id} = req.params;
        const category = await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:'Category deleted Successfully',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error while deleting Category',
            error,
        })
    }
};

