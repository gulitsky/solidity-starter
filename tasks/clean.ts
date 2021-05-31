import { TASK_CLEAN } from "hardhat/builtin-tasks/task-names";
import { task } from "hardhat/config";
import { emptyDir, remove } from "fs-extra";

task(
  TASK_CLEAN,
  "Clears the cache and deletes all artifacts",
  async (_taskArgs, { config }, runSuper) => {
    await emptyDir("./coverage/");
    await remove("./coverage.json");
    if (config.typechain?.outDir) {
      await emptyDir(config.typechain.outDir);
    }
    await runSuper();
  },
);
