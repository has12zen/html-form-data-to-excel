exports.BatchWriter = async (data, formData, sheetIndexes) => {
	console.log('appending');
	let date = new Date();
	let ate = `${date.getYear()}-${
		date.getMonth() + 1
	}-${date.getDate()}::${date.getHours()}:${date.getMinutes()}`;
	const sheets = await data;
	const values = [
		ate,
		formData.rollNo,
		formData.name,
		formData.email,
		formData.phoneNo,
	];
	const colors = [
		[0.5, 0.5, 0.5], //Grey
		[0.5, 0.5, 0.5], //Grey
		[0.5, 0.5, 0.5], //Grey
		[0.5, 0.5, 0.5], //Grey
		[0.5, 0.5, 0.5], //Grey
	];
	const child = {
		rows: [
			{
				values: values.map((v, i) => ({
					userEnteredValue: {
						stringValue: v,
					},
					userEnteredFormat: {
						backgroundColor: {
							red: colors[i][0],
							green: colors[i][1],
							blue: colors[i][2],
						},
					},
				})),
			},
		],
		fields: '*',
	};
	const children = [];
	if (typeof formData.options !== 'string') {
		formData.options.forEach((el) => {
			children.push({
				appendCells: {
					sheetId: +sheetIndexes[el],
					...child,
				},
			});
		});
	} else {
		children.push({
			appendCells: {
				sheetId: +sheetIndexes[formData.options],
				...child,
			},
		});
	}

	sheets.spreadsheets.batchUpdate(
		{
			spreadsheetId: process.env.SPREADSHEET_ID,
			resource: {
				requests: children,
			},
		},
		(err, resp) => {
			if (err) throw err;
			console.log(resp.data);
		}
	);
};
