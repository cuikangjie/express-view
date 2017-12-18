const webpackConfig = require("./webpack.config");
const path = require("path");
const cp = require("child_process");
const resolve = file => path.resolve(__dirname, file);
const { tools } = require("kin-toolkits");
const { watch, format, cleanFile, copyFile } = tools;

// 启动服务
let server,
  flag = false;

// 回调重启服务
const restart = () => {
  if (server) {
    server.kill("SIGTERM");
  }
  server = cp.spawn("node", ["./build/app.js"]);
  server.stdout.on("data", data => {
    const time = new Date().toTimeString();
    process.stdout.write(time.replace(/.*(\d{2}:\d{2}:\d{2}).*/, "[$1] "));
    process.stdout.write(data);
  });
  server.stderr.on("data", x => {
    process.stderr.write(x);
  });
};

process.on("exit", () => {
  if (server) {
    server.kill("SIGTERM");
  }
});

const run = async () => {
  await watch(
    webpackConfig,
    () => {
      flag = true;
      console.log("build node success");
      restart();
    },
    async () => {
      // await cleanFile(resolve("../build/*")).then(value => {
      //   console.log("remove build ...");
      // });
    }
  );
};

cleanFile(resolve("../build/*")).then(value => {
  run();
});
