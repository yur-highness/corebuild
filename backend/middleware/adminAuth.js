import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    console.log("No token found");
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);


   
   if (!req.body) req.body = {}; // ✅ create it if missing
    req.body.userId = decodedToken.id;

    // check role
    if (decodedToken.role !== "admin" ) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
    }
    // attach info to request for later use also refer to temp-caching for faster response
    req.user = {
      id: decodedToken.id,
      email: decodedToken.email,
      role: decodedToken.role,
      token: decodedToken 
       };

    next(); // ✅ allow access
  } catch (error) {
    console.error("Admin Auth Error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token. Please log in again.",
    });
  }
};

export default adminAuth;
