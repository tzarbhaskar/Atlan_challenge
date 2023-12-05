import nodemailer from 'nodemailer';
const config = {
    service: "gmail",
    auth: {
        user: "testatlan67@gmail.com",
        pass: "wzxnzkkhywltaflq"
    }
}
const transporter = nodemailer.createTransport(config);

export default transporter;