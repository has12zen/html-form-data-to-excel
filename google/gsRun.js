const { google } = require('googleapis');

exports.gsrun = async (cl) => {
	console.log('Fetching latest data...');
	var gsapi = await google.sheets({ version: 'v4', auth: cl });
	var opt = {
		spreadsheetId: process.env.SPREADSHEET_ID,
		range: 'A2:A4',
	};
	return gsapi;
	// console.log(data.data.values.length);
};
