import transporter from './mailConfig.js';
import extractEmailFromFormAndResponse from '../Utils/extractEmailFromFormAndResponse.js';
import collectFailedActions from '../Utils/collectFailedActions.js';

const sendMailReceiptToParticipant = async (response, form) => {
    const actionId = 2;
    try {
        const email = extractEmailFromFormAndResponse(response, form);
        await transporter.sendMail({
            to: email,
            subject: "Form Confirmation",
        text: `Hi, This is a Reciept for your participation in filling the Form titled: ${form.title}. Thanks!`
        });
        return true;
    }
    catch (err) {
        await collectFailedActions(err, response, form, actionId);
        return false;
    }
}

export default sendMailReceiptToParticipant;