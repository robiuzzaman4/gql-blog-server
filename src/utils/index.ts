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

export const checkUserAccess = async (
  prisma: any,
  userId: number,
  args: any
) => {
  // check if user exist
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  // throw error if user not found
  if (!user) {
    return {
      message: "User Not Found!",
      post: null,
    };
  }

  const post = await prisma.post.findUnique({
    where: {
      id: Number(args?.postId),
    },
  });

  // throw error if post not found
  if (!post) {
    return {
      message: "Post Not Found!",
      post: null,
    };
  }

  // throw error if user id and author id are not the same
  if (user?.id !== post?.authorId) {
    return {
      message: "Post Not Owned by User!",
      post: null,
    };
  }
};
