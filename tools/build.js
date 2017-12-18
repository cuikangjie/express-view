const webpackConfig = require('./webpack.config');
const path = require('path')
const pkg = require('../package.json');

const {
  format,
  cleanFile,
  copyFile,
  mkdir,
  writeFile,
  build
} = require('kin-toolkits').tools
const resolve = file => path.resolve(__dirname, file)



async function run() {
  console.log(`${format(new Date())}  start build \n`);

  await build(webpackConfig).then(() => {
    console.log(' build success !\n\n');
  }).catch((err) => {
    console.log('error:', err);
  })

  console.log(`${format(new Date())}  Finished build`);
}

cleanFile(resolve('../build/*')).then(async(value) => {
  await writeFile(resolve('../build/package.json'), JSON.stringify({
    private: true,
    engines: pkg.engines,
    dependencies:  pkg.dependencies,
    scripts: {
      start: 'node ./start.js && pm2 list'
    },
  }, null, 2)),

  await copyFile(resolve('../yarn.lock'), resolve('../build/yarn.lock'))

  run()
})
