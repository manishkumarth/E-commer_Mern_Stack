
const Product = require("../model/productschema")
const addProduct = async (req, res) => {
  try {
    const userId = req.user.id;
    const username = req.user.name;
    const userRole = req.user.role;
    if (userRole !== 'admin' && userRole !== 'seller') {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const { title, description, price, category, stock, image } = req.body;

    if (!title || !description || !price || !category || !stock || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new Product({
      title,
      description,
      price,
      category,
      stock,
      image,
      comment: [],
      sellerInfo: {
        sellername: username,
        sellerId: userId
      }
    });

    await newProduct.save();

    res.status(201).json({ message: "Product added successfully", product: newProduct });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.sellerInfo.sellerId !== userId && userRole !== 'admin' || userRole !== 'seller') {
      return res.status(403).json({ message: "Unauthorized to delete this product" });
    }
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
const getSellerProducts = async (req, res) => {
  try {
    const userId = req.user.id;
    const products = await Product.find({ "sellerInfo.sellerId": userId });
    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = {
  addProduct, deleteProduct, getAllProducts, getSellerProducts
};