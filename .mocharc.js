require('dotenv').config({ path:'.env.test' })
module.exports = {
	exit: true,
	color: true,
	spec: [
		"test/**/*.spec.js"
	],
};
