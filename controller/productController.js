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

export const updateProductcontroller = async(req,res)=>{
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

        // const product = new productModel({...req.fields,slug:slugify(name)});
        const product = await productModel.findByIdAndUpdate(req.params.id,{...req.fields,slug:slugify(name)}, {new:true});
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

export const getProductcontroller = async(req,res)=>{
    try {
        const product = await productModel.find({}).populate("category").select("-photo").limit(12).sort({createdAt:-1});
        res.status(201).send({
            success:true, 
            totalProduct:product.length,
            message:'All products fetched successfully',
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

export const getsingleProductcontroller = async(req,res)=>{
    try {
        const {slug} = req.params;
        const product = await productModel.findOne({slug}).select("-photo").populate("category");
        res.status(201).send({
            success:true,
            message:'product fetched successfully',
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

export const productPhotocontroller = async(req,res)=>{
    try {
        const product = await productModel.findById(req.params.id).select("photo");
        if(product.photo.data){
            res.set('Content-type',product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in fetching Product photo',
            error,
        })
    }
}

export const deleteProductcontroller = async(req,res)=>{
    try {
        const Product = await productModel.findByIdAndDelete(req.params.id).select("-photo");
        res.status(201).send({
            success:true,
            message:'Product deleted successfully'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in deleting Product',
            error,
        })
    }
};

export const productfiltersController = async (req, res) => {
    try {
      const { checked, radio } = req.body;
      let args = {};
      if (checked.length > 0) args.category = checked;
      if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
      const product = await productModel.find(args);
      res.status(201).send({
        success: true,
        product,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Filtering Products",
        error,
      });
    }
  };

  export const productCountController = async (req, res) => {
    try {
      const total = await productModel.find({}).estimatedDocumentCount();
      res.status(200).send({
        success: true,
        total,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: "Error in product count",
        error,
        success: false,
      });
    }
  };

  export const productListController = async (req, res) => {
    try {
      const perPage = 3;
      const page = req.params.page ? req.params.page : 1;
      const product = await productModel
        .find({})
        .select("-photo")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        product,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "error in per page ctrl",
        error,
      });
    }
  };

  export const searchProductController = async (req, res) => {
    try {
      const { keyword } = req.params;
      const result = await productModel
        .find({
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
          ],
        })
        .select("-photo");
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error In Search Product API",
        error,
      });
    }
  };

  export const realtedProductController = async (req, res) => {
    try {
      const { pid, cid } = req.params;
      const product = await productModel
        .find({
          category: cid,
          _id: { $ne: pid },
        })
        .select("-photo")
        .limit(3)
        .populate("category");
      res.status(200).send({
        success: true,
        product,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "error while geting related product",
        error,
      });
    }
  };

