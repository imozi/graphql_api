import jwt from "jsonwebtoken";

export const readToken = (req, res, next) => {
  const { token } = req.session;

  if (token) {
    const { userId } = jwt.verify(token, process.env.SECRET);
    req.userId = userId;
  }

  next();
};
