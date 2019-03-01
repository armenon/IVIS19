const fs = require('fs');
const csv2json = require('csvjson-csv2json');
const path = require('path')

const inputGapminderFolder = `../data/Gapminder`;

const loadGapminderData = () => {
	const data = {};
	for (let fileName of fs.readdirSync(inputGapminderFolder)) {
		if (path.extname(fileName) === '.csv') {
			fileName = fileName.replace(/\.[^/.]+$/, '');
			const file = fs.readFileSync(`${inputGapminderFolder}/${fileName}.csv`, 'utf8');
			const json = csv2json(file, {
				parseNumbers: true
			});
			data[fileName] = json;
		}
	}
	return data;
}

const rawStr = (string) => {
	if (!string) return '';
	return string.toLowerCase().replace(/\s/g, '');
}

const getCountryGapminderData = (gmData, properties) => {
	const values = Object.keys(gmData);
	const data = {};

	for (let value of values) {
		if (data[value] == null) data[value] = {};
		for (let row of gmData[value]) {
			let countryName = row['country']
			if (rawStr(countryName) == rawStr(properties.name)) {
				delete row['country'];
				data[value] = row;
			}
		}
	}
	return data;
}

console.log('...STARTING...');

const gapminderData = loadGapminderData();
const topo = fs.readFileSync(`../data/world-50m.json`, 'utf8');
const topoJSON = JSON.parse(topo);
const geometries = topoJSON['objects']['units']['geometries'];

for (let geometry of geometries) {
	const properties = geometry['properties'];
	if (!properties.name) return;
	properties['gapminder'] = getCountryGapminderData(gapminderData, properties);
}

fs.writeFileSync(`../public/world-50m.json`, JSON.stringify(topoJSON).replace(/\uFFFD/g, ''));

console.log('DONE!!!')
