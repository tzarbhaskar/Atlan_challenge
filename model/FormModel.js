import mongoose from 'mongoose';
import { QuestionSchema } from './QuestionModel.js'
export const FormSchema = mongoose.Schema({
    title: String,
    questions: [QuestionSchema],
    actionList: [Number],
    // googleSheetLink: String,
    // googleSheetId: String,
    actionParameters: {
        type: Object,
        default: {
            actionObjectCreated: true
        }
    }
});


const FormModel = new mongoose.model("formModel", FormSchema);

export default FormModel;