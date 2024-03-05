import nodemailer from "nodemailer";

// import { EMAIL_PASSWORD, EMAIL_USER } from "./envs";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "",
    pass: "",
  },
});
