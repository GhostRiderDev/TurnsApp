import { z } from "zod";

const registerSchema = z
  .object({
    username: z.string({ required_error: "Username is require" }).email(),
    password: z
      .string({ required_error: "Password is require" })
      .min(5, { message: "Password must be contain almost 5 character" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:"<>?~\\-]).{5,30}$/,
        {
          message:
            "Password must be almost one uppercase, one number and one special character",
        }
      ),
    confirmPassword: z
      .string({ required_error: "Retype password is require" })
      .min(5, { message: "Password must be contain almost 5 character" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:"<>?~\\-]).{5,30}$/,
        {
          message:
            "Password must be almost one uppercase, one number and one special character",
        }
      ),
    firstName: z
      .string({ required_error: "First name is require" })
      .regex(/[a-zA-z]/, {
        message: "First name must be contain only letters",
      }),
    lastName: z
      .string({ required_error: "Last name is require" })
      .regex(/[a-zA-z]/, { message: "Last name must be contain only letters" }),
    phone: z
      .string({
        required_error: "Phone is require",
      })
      .regex(/^[0-9]{10}$/, { message: "Phone must be contain only numbers" })
      .length(10, { message: "Phone must be contain 10 numbers" }),
    nDni: z
      .string()
      .regex(/^\d{6,15}$/, { message: "DNI number must contain only numbers" })
      .min(6, { message: "DNI number must be contain almost 6 numbers" })
      .max(15, { message: "DNI number must be contain less than 15 numbers" }),
    birthdate: z.date(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default registerSchema;
