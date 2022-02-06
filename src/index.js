require('dotenv/config')

const app = require('express')()

app.listen(process.env.SERVER_PORT || 3000)