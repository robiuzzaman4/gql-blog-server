export type SignupPayload = {
  name: string;
  email: string;
  password: string;
  bio?: string;
};

export type SigninPayload = {
  email: string;
  password: string;
};
