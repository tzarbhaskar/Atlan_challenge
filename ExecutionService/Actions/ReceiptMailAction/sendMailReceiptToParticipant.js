import transporter from './mailConfig.js';
import extractEmailFromFormAndResponse from '../Utils/extractEmailFromFormAndResponse.js';
import collectFailedActions from '../Utils/collectFailedActions.js';

const sendMailReceiptToParticipant = async (responses, form) => {
    const actionId = 2;
    try {
        const emails = extractEmailFromFormAndResponse(responses, form);
        const promises = emails.map(email => {
            return transporter.sendMail({
                to: email,
                subject: "Form Confirmation",
                text: `Hi, This is a Reciept for your participation in filling the Form titled: ${form.title}. Thanks!`
            });
        });
        const x = await Promise.allSettled(promises);
        return true;
    }
    catch (err) {
        await collectFailedActions(err, responses, form, actionId);
        return false;
    }
}

export default sendMailReceiptToParticipant;