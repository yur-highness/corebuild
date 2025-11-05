import  jwt  from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const token = req.cookies.token; // Access the token from the object

  if (!token) {
    console.log("No token found");
    return res.status(400).json({
      success: false,
      message: "NOT AUTHORIZED, login AGAIN"
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded token:", decodedToken);
    if (decodedToken && decodedToken.id) {
      req.body.userId = decodedToken.id;
    } else {
      return res.status(400).json({
        success: false,
        message: "NOT AUTHORIZED, login AGAIN"
      })
    }
    next();
  } catch (error) {
    console.log("Error verifying token:", error);
    return res.status(400).json({
      success: false,
      message: "NOT AUTHORIZED, login AGAIN"
    });
  }
};

export default userAuth;