const { gsrun } = require('./gsRun');
const { google } = require('googleapis');

const keysEnvVar = process.env.CREDS;
const keys = JSON.parse(keysEnvVar); // https://stackoverflow.com/questions/57334178/how-to-use-env-to-store-a-json-key-for-use-with-jwt

const googleClient = new google.auth.JWT(
	keys.client_email, //email
	null,
	keys.private_key, //key
	['https://www.googleapis.com/auth/spreadsheets']
);

exports.gClientAuthorize = (gClient) => {
	console.log('Authorizing...');

	gClient.authorize((err) => {
		if (err) throw err;
		console.log('Connected!');
	});
};

exports.gClient = googleClient;
