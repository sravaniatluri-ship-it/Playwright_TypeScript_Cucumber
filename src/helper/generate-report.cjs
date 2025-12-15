const reporter = require("cucumber-html-reporter");
const path = require("path");
const fs = require("fs");

const jsonFile = path.join(process.cwd(), "reports", "cucumber-report.json");
const outFile = path.join(process.cwd(), "reports", "cucumber-report.html");

if (!fs.existsSync(jsonFile)) {
  console.error(`Missing JSON report at ${jsonFile}. Run tests first.`);
  process.exit(1);
}

const options = {
  theme: "bootstrap",
  jsonFile,
  output: outFile,
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
  metadata: {
    "Test Env": process.env.TEST_ENV || "main",
    "Browser": "chromium",
  },
};

reporter.generate(options);
console.log(`HTML report generated: ${outFile}`);
