const Product = require("../model/productschema");
const UserCart = require("../model/usercartschema");

const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity,sellerId } = req.body;

    if (!productId || quantity == null) {
      return res.status(400).json({ message: "Missing fields" });
    }


    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const price = product.price;
    const itemTotal = price * quantity;

    let cart = await UserCart.findOne({ userId });

    if (!cart) {
      cart = new UserCart({
        userId,
        items: [{
          productId,
          title: product.title,
          price,
          quantity,
          image: product.image,
          total: itemTotal,
          sellerId:sellerId
        }],
        cartTotal: itemTotal
      });

      await cart.save();
      return res.status(201).json({ message: "Item added to cart", cart });
    }

    // Cart exists
    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
      cart.items[itemIndex].total += itemTotal;
    } else {
      cart.items.push({
        productId,
        title: product.title,
        price,
        quantity,
        image: product.image,
        total: itemTotal
      });
    }

    cart.cartTotal = cart.items.reduce(
      (sum, item) => sum + item.total,
      0
    );

    await cart.save();
    res.status(200).json({ message: "Cart updated", cart });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const getUserCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await UserCart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    let cart = await UserCart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      i => i.productId.toString() === productId.toString()
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }


    if (item.quantity > 1) {
      item.quantity -= 1;
      item.total = item.quantity * item.price;
    } else {
      cart.items = cart.items.filter(
        i => i.productId.toString() !== productId.toString()
      );
    }

    cart.cartTotal = cart.items.reduce(
      (sum, item) => sum + item.total,
      0
    );

    await cart.save();

    res.status(200).json({
      message: "Cart updated",
      cart
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = { addToCart, getUserCart, removeFromCart };
