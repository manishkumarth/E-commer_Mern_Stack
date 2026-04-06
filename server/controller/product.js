
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
    // await Product.findByIdAndDelete(productId);
    console.log("product deleted successfully")
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


const updateProduct = async (req, res) => {
  try {
    const { title, description, price, image, category, stock } = req.body;

    const product = await Product.findById(req.params.productId);
    console.log(product, req)
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // check if user is admin OR the product seller
    if (
      req.user.role !== "admin" &&
      req.user.id !== product.sellerInfo.sellerId
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    // update product
    product.title = title;
    product.description = description;
    product.price = price;
    product.image = image;
    product.category = category;
    product.stock = stock;

    await product.save();

    res.status(200).json({ message: "Product updated", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // // only admin or seller can access
    // if (
    //   req.user.role !== "admin" &&
    //   req.user.id !== product.sellerInfo.sellerId
    // ) {
    //   return res.status(403).json({ message: "Access denied" });
    // }

    res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getEmbedding = require("../services/Ai")
const searchByImage = async (req, res) => {
  try {
    console.log("FILE:", req.file);

    const embedding = await getEmbedding(
      req.file ? req.file.path : "TEST_URL"
    );

    console.log("EMBEDDING:", embedding);

    res.status(200).json({ embedding });

  } catch (error) {
    console.log(" FULL ERROR:", error);
    console.log("MESSAGE:", error.message);
    console.log("RESPONSE:", error.response?.data);

    res.status(500).json({
      message: "Error in image search",
      error: error.message,
      pythonError: error.response?.data
    });
  }
};

const generateEmbeddingSingle = async (req, res) => {
  console.log("request: ", req)
  try {
    const { id } = req.params;

    // admin check (optional but recommended)
    if (req.user.role !== "admin" && req.user.role !== "seller") {
      return res.status(403).json({ message: "Access denied" });
    }

    const product = await Product.findById(id);
    console.log(id)

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // skip if already exists
    if (product.embedding && product.embedding.length > 0) {
      return res.status(200).json({
        message: "Embedding already exists",
        product
      });
    }

    // generate embedding
    let embedding = await getEmbedding(product.image);

    //  STEP 1: agar string hai → parse karo
    if (typeof embedding === "string") {
      embedding = JSON.parse(embedding);
    }

    //  STEP 2: agar nested array hai → flatten karo
    if (Array.isArray(embedding) && Array.isArray(embedding[0])) {
      embedding = embedding[0];
    }

    //  STEP 3: ensure numbers only
    embedding = embedding.map(num => Number(num));

    console.log("FINAL EMBEDDING TYPE:", typeof embedding[0]); // should be number

    product.embedding = embedding;
    await product.save();

    res.status(200).json({
      message: "Embedding generated successfully",
      product
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  addProduct, deleteProduct, getAllProducts, getSellerProducts, updateProduct, getProductById, searchByImage, generateEmbeddingSingle
};