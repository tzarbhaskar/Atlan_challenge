import { Kafka, Partitioners } from "kafkajs"
export const kafkaClient = new Kafka({
    clientId: 'emfuawgg',
    brokers: ['dory.srvs.cloudkafka.com:9094'],
    ssl: true,
    sasl: {
        mechanism: 'scram-sha-512',
        username: 'emfuawgg',
        password: 'zaEXG5far7ht-a61ukIxcvRCaqq4u_l8'
    },
});


export const kafkaProducer = kafkaClient.producer({
    createPartitioner: Partitioners.LegacyPartitioner
});