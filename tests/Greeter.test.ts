import { ethers } from "hardhat";
import { Greeter__factory as GreeterFactory } from "./../typechain";

const HELLO_WORLD_EN = "Hello, world!";
const HELLO_WORLD_RU = "Привет, мир!";

describe("Greeter", () => {
  it("Should return the new greeting once it's changed", async () => {
    const [wallet] = await ethers.getSigners();

    const greeter = await new GreeterFactory(wallet).deploy(HELLO_WORLD_EN);
    expect(await greeter.greet()).toEqual(HELLO_WORLD_EN);

    await greeter.setGreeting(HELLO_WORLD_RU);
    expect(await greeter.greet()).toEqual(HELLO_WORLD_RU);
  });
});
