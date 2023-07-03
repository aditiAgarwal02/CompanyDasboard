const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const convertCsvToJson = (csvFilePath, outputFolderPath) => {
  const jsonData = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => jsonData.push(data))
    .on('end', () => {
      const fileName = path.basename(csvFilePath, path.extname(csvFilePath));
      const outputJsonFilePath = path.join(outputFolderPath, `${fileName}.json`);

      const jsonContent = JSON.stringify(jsonData);
      fs.writeFileSync(outputJsonFilePath, jsonContent);
      console.log(`Conversion completed for ${fileName}`);
    });
};

const csvFilePaths = [
  path.join(process.cwd(), 'src', 'dataset', 'AlertRange.csv'),
  path.join(process.cwd(), 'src', 'dataset', 'GeoLocation.csv'),
  path.join(process.cwd(), 'src', 'dataset', '18-08-2021.csv')
];

const outputFolderPath = path.join(process.cwd(), 'src', 'dataset');

csvFilePaths.forEach(csvFilePath => {
  convertCsvToJson(csvFilePath, outputFolderPath);
});