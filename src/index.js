require('dotenv/config')
const middlewares = require('./middlewares')
const redirectRoute = require('./routes/redirect')
const urlsRoute = require('./routes/urls')

const app = require('express')()
middlewares.forEach(middleware => {
	app.use(middleware)
})
app.use(redirectRoute)
app.use(urlsRoute)

app.listen(process.env.SERVER_PORT || 3000)