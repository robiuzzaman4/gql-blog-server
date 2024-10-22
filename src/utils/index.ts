import jwt from "jsonwebtoken";

export const generateToken = async (payload: { userId: number }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });

  return token;
};
