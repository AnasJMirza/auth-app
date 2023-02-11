import nodemailer from "nodemailer";
import Mailgen from 'mailgen';
import * as dotenv from 'dotenv';

dotenv.config();

// Configuration object for the node mailer
const config = {
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    }
};

let transport = nodemailer.createTransport(config);

// Configure mailgen by setting a theme and your product info
var mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        // Appears in header & footer of e-mails
        name: 'Mailgen',
        link: 'https://mailgen.js/'
        // Optional product logo
        // logo: 'https://mailgen.js/img/logo.png'
    }
});

export const mailer = async (req, res) => {
 
    const { userName, userEmail, text, subject } = req.body;

    var email = {
        body: {
            name: userName,
            intro: text || 'Welcome! We\'re very excited to have you on board.',
            action: {
                instructions: 'Someone request to reset your password. Is that you?',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Reset Password',
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    };

    var emailBody = mailGenerator.generate(email);


    let response = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: subject || "No subject",
        html: emailBody,
    }

    transport.sendMail(response)
    .then(()=> res.status(201).json({ success: true, message: 'you should receive an email!' }))
    .catch(()=> res.status(500).json({ success: false, message: 'Something went wrong!' }))

};
