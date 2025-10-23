import UserModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
  try {
    const { userId } = req.body;
    const users = await UserModel.findById(userId);
    if (!users) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }
    res.json({});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
