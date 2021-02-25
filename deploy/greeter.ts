import { DeployFunction } from "hardhat-deploy/types";

const HELLO_WORLD_RU: string = "Привет, мир!";

const deploy: DeployFunction = async ({ deployments, getNamedAccounts }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  if (!deployer) {
    return;
  }

  await deploy("Greeter", {
    from: deployer,
    args: [HELLO_WORLD_RU],
    log: true,
  });
};
export default deploy;
