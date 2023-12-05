import { Kafka, Partitioners } from "kafkajs"
export const kafkaClient = new Kafka({
    clientId: 'jhnizhfe',
    brokers: ['dory.srvs.cloudkafka.com:9094'],
    ssl: true,
    sasl: {
        mechanism: 'scram-sha-512',
        username: 'jhnizhfe',
        password: 'hpfemeSWfDHTrUFbQQDJMrtAsy6RVzqk'
    },
});


export const kafkaProducer = kafkaClient.producer({
    createPartitioner: Partitioners.LegacyPartitioner
});