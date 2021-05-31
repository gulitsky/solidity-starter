import { DeployFunction } from "hardhat-deploy/types";

const HELLO_WORLD = "Hello, world!";

const deploy: DeployFunction = async function ({
  deployments,
  getNamedAccounts,
}) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  if (!deployer) {
    return;
  }

  await deploy("Greeter", {
    from: deployer,
    args: [HELLO_WORLD],
  });
};
export default deploy;
