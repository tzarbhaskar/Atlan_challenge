import { kafkaClient } from "../../config/KafkaConfig.js";

export const KafkaConsumer = kafkaClient.consumer({ groupId: "emfuawgg-executionService" });