import jwt from "jsonwebtoken";

export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: "1h", // Adjust the expiration time as needed
  });
};