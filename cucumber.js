export default {
  default: {
    import: ["dist/**/*.js"],
    paths: ["features/**/*.feature"],
    publishQuiet: true,
     format: [
      "progress",
      "json:reports/cucumber-report.json"
    ]
  }
};