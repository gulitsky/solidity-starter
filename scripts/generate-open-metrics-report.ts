import { readJSON } from "fs-extra";

interface Method {
  contract: string;
  method: string;
  gasData: number[];
}

interface Deployment {
  name: string;
  deployedBytecode: string;
  gasData: number[];
}

interface Report {
  config: {
    metadata: {
      compiler: {
        version: string;
      };
      settings: {
        optimizer: {
          enabled: boolean;
          runs: number;
        };
      };
    };
  };
  info: {
    methods: Record<string, Method>;
    deployments: Deployment[];
  };
}

const sort = (data: number[]) => data.sort((a, b) => a - b);

const sum = (data: number[]) => data.reduce((a, b) => a + b, 0);

const quantile = (data: number[], q: number) => {
  const sortData: number[] = sort(data);
  const pos: number = (sortData.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sortData[base + 1] !== undefined) {
    return sortData[base]! + rest * (sortData[base + 1]! - sortData[base]!);
  } else {
    return sortData[base];
  }
};

async function main(): Promise<void> {
  const now = Math.floor(Date.now() / 1000);

  const ethGasReporterReport: Report = await readJSON(
    "./gasReporterOutput.json",
  );

  const report: string[] = [];
  report.push("# TYPE build info");
  const optimizerRuns = ethGasReporterReport.config.metadata.settings.optimizer
    .enabled
    ? ethGasReporterReport.config.metadata.settings.optimizer.runs
    : 0;
  // TODO: add `evm_version` label
  report.push(
    `build_info{solc_version="${ethGasReporterReport.config.metadata.compiler.version}",optimizer_runs="${optimizerRuns}"} 1`,
  );

  let methods: Method[] = Object.values(ethGasReporterReport.info.methods);
  if (ethGasReporterReport.info.deployments.length > 0) {
    report.push("# TYPE contract_size_bytes gauge");
    report.push("# UNIT contract_size_bytes bytes");

    for (const { name, deployedBytecode, gasData } of ethGasReporterReport.info
      .deployments) {
      const size = Buffer.from(
        deployedBytecode.replace(/__\$\w*\$__/g, "0".repeat(40)).slice(2),
        "hex",
      ).length;
      if (size > 0) {
        report.push(`contract_size_bytes{contract="${name}"} ${size}`);
      }
      methods.push({
        contract: name,
        gasData,
        method: "constructor",
      });
    }
  }

  methods = methods.filter(({ gasData }) => gasData.length > 0);
  if (methods.length > 0) {
    report.push("# TYPE contract_function_gas_usage summary");

    for (const { contract, gasData, method } of methods) {
      report.push(
        `contract_function_gas_usage_count{contract="${contract}",function="${method}"} ${gasData.length}`,
      );

      report.push(
        `contract_function_gas_usage_sum{contract="${contract}",function="${method}"} ${sum(
          gasData,
        )}`,
      );

      report.push(
        `contract_function_gas_usage_sum{contract="${contract}",function="${method}",quantile="0.25"} ${quantile(
          gasData,
          0.25,
        )}`,
      );
      report.push(
        `contract_function_gas_usage_sum{contract="${contract}",function="${method}",quantile="0.5"} ${quantile(
          gasData,
          0.5,
        )}`,
      );
      report.push(
        `contract_function_gas_usage_sum{contract="${contract}",function="${method}",quantile="0.75"} ${quantile(
          gasData,
          0.75,
        )}`,
      );
    }

    report.push(`contract_function_gas_usage_created ${now}`);
  }

  report.push("# EOF");
  console.debug(report.join("\n"));
}

main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
