import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "",
  port: "",
  secure: false,
  auth: {
    user: "",
    pass: "",
  },
});

