import { Router } from 'express';
import FormModel from '../model/FormModel.js';
import ResponseModel from '../model/ResponseModel.js';
import ActionMap from '../config/ActionMap.js';
import { kafkaProducer } from '../config/KafkaConfig.js';
const router = Router();

router.post("/create", async (req, res) => {
    const { title, questions } = req.body;
    const newForm = new FormModel({
        title,
        questions
    });
    await newForm.save();
    return res.json({ success: true, code: 200, data: newForm, err: null })
});

router.post("/submit", async (req, res) => {
    const newResponse = new ResponseModel(req.body);
    await newResponse.save();
    await kafkaProducer.send({
        topic: process.env.EXECUTION_KAFKA_TOPIC,
        messages: [{ key: newResponse._id.toString(), value: JSON.stringify(newResponse) }]
    })
    return res.json(newResponse);
});
router.put("/actionList/add", async (req, res) => {
    const { formId, actionIds } = req.body;
    const { actionList } = await FormModel.findById(formId);
    actionIds.forEach((actionId) => {
        if (actionList.indexOf(actionId) == -1 && ActionMap[actionId]) {
            actionList.push(actionId);
        }
    });
    const updatedForm = await FormModel.findByIdAndUpdate(formId, { actionList }, { new: true });
    return res.json({ success: true, code: 200, data: updatedForm, err: null });

});


export default router;