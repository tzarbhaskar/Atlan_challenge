import transporter from './mailConfig.js';
import extractEmailFromFormAndResponse from '../Utils/extractEmailFromFormAndResponse.js';

const sendMailReceiptToParticipant = async (response, form) => {
    const email = extractEmailFromFormAndResponse(response, form);
    await transporter.sendMail({
        to: email,
        subject: "Form Confirmation",
        text: `Hi, This is a Reciept for your participation in filling the Form titled: ${form.title}. Thanks!`
    });
}

export default sendMailReceiptToParticipant;