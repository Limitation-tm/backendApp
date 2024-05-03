import jwt from "jsonwebtoken";

export default async (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, "secret123");

      const roles = decoded.role;

      if (roles === "User") {
        return res.status(403).json({ message: "No access1" });
      }
      next();
    } catch (error) {
      return res.status(403).json({ message: "No access2" });
    }
  } else {
    return res.status(403).json({ message: "No access3" });
  }
};
