import UserModel from "../models/userModel.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity, variant } = req.body;
    const {userId} = req.body; // from auth middleware

    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // check if product already in cart
    const existing = user.cart.find(item => item.product.toString() === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity, variant });
    }

    await user.save();
    res.json({ success: true, cart: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//  Toggle wishlist item
export const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const {userId} = req.body;

    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const index = user.wishlist.findIndex(p => p.toString() === productId);
    if (index > -1) {
      user.wishlist.splice(index, 1);
    } else {
      user.wishlist.push(productId);
    }

    await user.save();
    res.json({ success: true, wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserData = async (req, res) => {
  try {
    const { userId } = req.body;
    const users = await UserModel.findById(userId).populate("cart.product").populate("wishlist");
    if (!users) {
      console.log("User does not exist");
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }
    res.json({
      success: true,
      userData: {
        _id: users._id,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
        role: users.role,
      },
      token: req.cookies.token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getUserCart = async (req, res) => {
  try {
    // You should have user ID set by your auth middleware
    const {userId} = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await UserModel.findById(userId).select("cart");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      cart: user.cart || {},
    });
  } catch (error) {
    console.error("Error fetching user cart:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error fetching cart",
    });
  }
};
