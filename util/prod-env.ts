import fs from 'fs';

const readStream = fs.createReadStream(`package.json`);
const packageJsonWriteStream = fs.createWriteStream(`./dist/package.json`);
const procfigWriteStream = fs.createWriteStream(`./dist/Procfile`);

let prodPackageJson = null;

readStream.on('data', (chunk) => {
  let packageJson = JSON.parse(chunk.toString());

  let { devDependencies, ...rest } = packageJson;
  prodPackageJson = rest;

  packageJsonWriteStream.write(JSON.stringify(prodPackageJson));
  procfigWriteStream.write('web: npm run heroku-start');
});
