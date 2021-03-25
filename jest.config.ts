import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  roots: ["<rootDir>/tests/"],
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testEnvironment: "node",
  verbose: true
};
export default config;
