import kafkaSubscription from "./KafkaSubscription.js";
import connectToDB from "../bootstrap/connectToDb.js";
const bootstrap = async () => {
    await connectToDB();
    await kafkaSubscription();
}

export default bootstrap;