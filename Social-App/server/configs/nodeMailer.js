import nodemailer from 'nodemailer';

// Create a transporter object using SMTP transport

const transporter = nodemailer.createTransport({
  host: "",
  port: 587,
  auth: {
    user: "",
    pass: "",
  },
});

// Continue from 07:50:00