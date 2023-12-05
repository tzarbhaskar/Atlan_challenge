import saveToGoogleSheet from './Actions/GoogleSheetAction/saveToGoogleSheet.js';
import sendMailReceiptToParticipant from './Actions/ReceiptMailAction/sendMailReceiptToParticipant.js';
const ActionMap = {
    1: saveToGoogleSheet,
    2: sendMailReceiptToParticipant
}
export default ActionMap;