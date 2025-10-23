import  jwt  from "jsonwebtoken";

const userAuth = async (req, res, next) => {
 const token = req.cookies;

 if(!token) {
    return res.status(400).json({
        success: false,
        message: "NOT AUTHORIZED, login AGAIN"
    });
 }

 try {
    const decodedTOKEN = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if(decodedTOKEN.id) {
        req.body.userId = decodedTOKEN.id;
    }
    else{
        return res.status(400).json({
            success: false,
            message: "NOT AUTHORIZED, login AGAIN"
        })
    }
    next();
 } 
 catch (error) {
    return res.status(400).json({
        success: false,
        message: "NOT AUTHORIZED, login AGAIN"
    });
 }
};

export default userAuth;