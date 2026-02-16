
const Category = require("../model/category");
const Product = require("../model/productschema");

const addCategory=async(req,res)=>{
    try {
        const { name, description } = req.body;
        const newCategory = new Category({ name, description });
        await newCategory.save();
        res.status(201).json({ message: "Category added successfully", category: newCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
const getAllCategories=async(req,res)=>{
    try {
        const categories = await Category.find({});
        res.status(200).json({ categories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }   
};
const getProductByCategory=async(req,res)=>{
    try {
        const { categoryId } = req.params;
        const products = await Product.find({ category: categoryId }); 
        res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }   
};

module.exports={addCategory,getAllCategories,getProductByCategory};