import jwt from "jsonwebtoken";

export const generateToken = async (payload: { userId: number }) => {
  const token = jwt.sign(payload, "SECRET_CODE", {
    expiresIn: "1d",
  });

  return token;
};
