import { z } from "zod";

export const signupschema = z.object({
  name: z
    .string({ required_error: "Name Is Required" })
    .trim()
    .min(3, { message: "Name Must Be At Least Of 3 Chars" }),
  email: z
    .string({ required_error: "Email Is Required" })
    .email({ message: "Invalid Email" }),
  password: z
    .string({ required_error: "Password Is Required" })
    .min(6, { message: "Password Must Be At Least Of 6 Chars" }),
  pic: z.string().optional(),
  registerDate: z.number(),
});

export const loginschema = z.object({
  email: z
    .string({ required_error: "Email Is Required" })
    .email({ message: "Invalid Email" }),
  password: z
    .string({ required_error: "Password Is Required" })
    .min(6, { message: "Invalid Password" }),
});
