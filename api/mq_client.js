const redis = require("redis");

const subscriber = redis.createClient();
const publisher = redis.createClient();

subscriber.subscribe("answer");

module.exports = (numbers) => {
    return new Promise((resolve, reject) => {
        publisher.publish("sum", JSON.stringify(numbers));

        subscriber.on("message", (channel, message) => {
            const sum = JSON.parse(message)
            resolve(sum)
        })
    })
} 