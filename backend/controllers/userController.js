import UserModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
  try {
    const { userId } = req.body;
    const users = await UserModel.findById(userId);
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
