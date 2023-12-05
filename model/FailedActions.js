import mongoose from 'mongoose';
import { ResponseSchema } from './ResponseModel.js';
export const FailedActionsSchema = mongoose.Schema({
    actionId: Number,
    error: Object,
    response: ResponseSchema
});


const FailedActionsModel = new mongoose.model("failedActionsModel", FailedActionsSchema);

export default FailedActionsModel;