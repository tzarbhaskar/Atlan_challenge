import mongoose from 'mongoose';
import { QuestionSchema } from './QuestionModel.js'
export const FormSchema = mongoose.Schema({
    title: String,
    questions: [QuestionSchema],
    actionList: [Number]
});


const FormModel = new mongoose.model("formModel", FormSchema);

export default FormModel;