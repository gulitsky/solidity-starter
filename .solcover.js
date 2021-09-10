const { emptyDir } = require("fs-extra");

module.exports = {
  configureYulOptimizer: true,
  onIstanbulComplete: async () => {
    await emptyDir("./typechain");
  },
  istanbulReporter: ["lcov"],
};
