const express = require('express'); //step 01 : import express module
const router = express.Router(); //step 02 : create router object
const app = express(); //step 03 : create express app
const bodyParser = require('body-parser');
const { BatchWriter } = require('./sheets');

if (process.env.NODE_ENV !== 'production') {
	const { config } = require('dotenv');
	config({ path: __dirname + '/.env' });
}
const { gClient, gClientAuthorize } = require('./google/gClient');
const { gsrun } = require('./google/gsRun');

gClientAuthorize(gClient);

const sheetIndexes = JSON.parse(process.env.SHEET_IDS);
app.use('/', router);

router.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

router.use(
	bodyParser.json({
		extended: true,
	})
);

router.get('/', function (req, res) {
	// console.log(res);
	res.sendFile('submit.html', { root: __dirname });
});

router.post('/submit', async function (req, res) {
	try {
		if (req.body.options === undefined) throw new Error('NO Option defined');
		await BatchWriter(gsrun(gClient), req.body, sheetIndexes);
		res.sendFile('success.html', { root: __dirname });
	} catch (e) {
		console.log(e);
		res.sendFile('error.html', { root: __dirname });
	}
});

const port = process.env.PORT || 8000;
app.listen(port, function () {
	//step 04 : make app listen via an specific port.
	console.log(`express server is up! : http://localhost:${port}`);
});
