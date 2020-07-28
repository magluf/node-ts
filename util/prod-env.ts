import fs from 'fs'

const readStream = fs.createReadStream(`package.json`)
const writeStream = fs.createWriteStream(`./dist/package.json`)
let prodPackageJson = null

readStream.on('data', (chunk) => {
  let packageJson = JSON.parse(chunk.toString())

  let { devDependencies, ...rest } = packageJson
  prodPackageJson = rest

  writeStream.write(JSON.stringify(prodPackageJson))
})
