import { expect } from "chai";
import { ethers } from "hardhat";

const HELLO_WORLD_EN = "Hello, world!";
const HELLO_WORLD_RU = "Привет, мир!";

describe("Greeter", () => {
  it("Should return the new greeting once it's changed", async () => {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy(HELLO_WORLD_EN);
    await greeter.deployed();

    expect(await greeter.greet()).to.equal(HELLO_WORLD_EN);

    await greeter.setGreeting(HELLO_WORLD_RU);
    expect(await greeter.greet()).to.equal(HELLO_WORLD_RU);
  });
});
