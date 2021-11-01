const redis = require("redis");
const sum = require('./sum')

const subscriber = redis.createClient();
const publisher = redis.createClient();

subscriber.on("message", function(channel, message) {
    console.log(message)
    const numbers = JSON.parse(message)
    publisher.publish("answer", sum(numbers))
});

subscriber.subscribe("sum");