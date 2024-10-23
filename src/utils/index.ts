import jwt from "jsonwebtoken";

export const generateToken = async (payload: { userId: number }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });

  return token;
};

export const getUserInfoFromToken = async (token: string) => {
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: number;
    };
    return user;
  } catch (error) {
    return null;
  }
};
