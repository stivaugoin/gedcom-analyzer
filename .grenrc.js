module.exports = {
  dataSource: "prs",
  onlyMilestones: false,
  groupBy: {
    "Enhancements:": ["enhancement", "refactor", "ui"],
    "Bug Fixes:": ["bug", "technical debt"],
    "Continuous integration": ["ci / cd"],
  },
  template: {
    issue: "- {{name}} [{{text}}]({{url}})",
  },
  changelogFilename: "CHANGELOG.md",
};
