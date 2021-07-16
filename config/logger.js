const pino = require('pino')
const logger = pino({
	prettyPrint: true,
	level: 'debug',
	enabled: true,
})
module.exports = logger;