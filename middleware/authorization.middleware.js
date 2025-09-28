import jwt from "jsonwebtoken";

export const Authorization = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      res.status(401).json({ message: "Unauthorize: no token provided " });
    }
    const token = authHeader?.split(" ")[1];
    const Secret = process.env.SECRET_CODE;
    const decode = jwt.verify(token, Secret);
    next();
    req.user = decode;
  } catch (err) {
    console.log("error", err);
  }
};
