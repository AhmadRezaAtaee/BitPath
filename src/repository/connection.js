const { createClient } = require('redis')

const client = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT || undefined,
    },
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
});

client.on('error', error => {
    console.log(error)
    process.exit(1)
})

client.on('connect', () => console.log("Redis Connection: OK"))

module.exports = client.connect().then(() => client)