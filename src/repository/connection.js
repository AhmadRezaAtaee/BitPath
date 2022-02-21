const { createClient } = require('redis')
const {
    REDIS_LOG,
    REDIS_HOST,
    REDIS_PORT,
    REDIS_USERNAME,
    REDIS_PASSWORD,
} = process.env

const client = createClient({
    socket: {
        host: REDIS_HOST,
        port: REDIS_PORT || undefined,
    },
    username: REDIS_USERNAME,
    password: REDIS_PASSWORD,
});

client.on('error', error => {
    client.disconnect()
    console.error("Redis Connection: ", error);
    process.exit(1)
})

client.on('connect', () => {
    if (REDIS_LOG) {
        console.log("Redis Connection: OK");
    }
    return
})

client.connect()

module.exports = client