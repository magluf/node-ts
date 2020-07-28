import fs from 'fs';

const dir = process.argv[3] || `dist`;

const readStream = fs.createReadStream(`package.json`);
const packageJsonWriteStream = fs.createWriteStream(`./${dir}/package.json`);
const procfigWriteStream = fs.createWriteStream(`./${dir}/Procfile`);

let prodPackageJson = null;

readStream.on('data', (chunk) => {
  let packageJson = JSON.parse(chunk.toString());

  let { devDependencies, ...rest } = packageJson;
  prodPackageJson = rest;

  packageJsonWriteStream.write(JSON.stringify(prodPackageJson));
  procfigWriteStream.write('web: npm run heroku-start');
});
