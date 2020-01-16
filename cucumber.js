const outputFolder = 'output/'

const common = [
  '--require-module ts-node/register',
  '--require features/**/*.ts',
  `--format ${
    process.env.CI || !process.stdout.isTTY ? 'progress' : 'progress-bar'
  }`,
  `--format rerun:${outputFolder}@rerun.txt`,
  `--format usage:${outputFolder}usage.txt`,
  `--format json:${outputFolder}report.json`
].join(' ')

module.exports = {
  default: common,
  outputFolder
}
