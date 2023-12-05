import kafkaSubscription from "./KafkaSubscription.js";
import connectToDB from "../bootstrap/connectToDB.js";
import { kafkaProducer } from "../config/KafkaConfig.js";
const bootstrap = async () => {
    await connectToDB();
    await kafkaSubscription();
    await kafkaProducer.connect();
}

export default bootstrap;