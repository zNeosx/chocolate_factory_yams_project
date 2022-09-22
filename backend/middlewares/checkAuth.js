import jwt from "jsonwebtoken";

export const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      res.status(401).json({ message: "Non authentifié" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error.message });
  }
};
