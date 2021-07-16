const randomstring = require('randomstring');

function generatePublicId(length = 6) {
	const publicId = randomstring.generate({
		length: length,
		charset: 'alphanumeric'
	});

	return publicId;
}
module.exports.generatePublicId = generatePublicId;