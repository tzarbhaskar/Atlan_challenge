import { kafkaProducer } from "../config/KafkaConfig.js";
import connectToDB from "./connectToDB.js"
import registerGlobalMiddlewares from "./registerGlobalMiddlewares.js";

const bootstrap = async (app) => {
    registerGlobalMiddlewares(app)
    await connectToDB();
    await kafkaProducer.connect();
}

export default bootstrap;