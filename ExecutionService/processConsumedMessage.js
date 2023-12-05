import FormModel from '../model/FormModel.js'
import ActionMap from './ActionMap.js';
const processConsumedMessage = async (message) => {
    const consumedPayload = JSON.parse(message.value.toString());
    const form = await FormModel.findById(consumedPayload.formId);
    form.actionList.forEach(actionId => {
        ActionMap[actionId](consumedPayload, form);
    })
}

export default processConsumedMessage;