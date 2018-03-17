# Gedcom Analyzer

[![React](https://img.shields.io/badge/React-v16.2.0-blue.svg)](https://facebook.github.io/react-native/)
[![React](https://img.shields.io/badge/React%20Router-v4.2.2-blue.svg)](https://facebook.github.io/react-native/)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

**Gedcom Analyzer** is a web application that allows you to view the information of family trees in different ways.

## Prerequisites

* [Node](https://nodejs.org) (it is recommendd to install it via [NVM](https://github.com/creationix/nvm))
* [Yarn](https://yarnpkg.com/)

### For release team only

* [GREN](https://github.com/github-tools/github-release-notes)

## Getting started

1. Clone this repo, `git clone git@github.com:stivaugoin/gedcom-analyzer.git`
2. Go to project's root directory, `cd gedcom-analyzer`
3. Run `yarn` to install dependencies
4. Run `yarn start` to start application

## Scripts

See `package.json`

## Flow

This project use [Flow](https://flow.org) to checks code for errors through static type annotations.

* Run checker: `yarn flow`
* Run coverage: `yarn flow:coverage`

See [Flow documentation](https://flow.org/en/docs/) for more information.

## Create a release

This project use [GREN](https://github.com/github-tools/github-release-notes) to generate changelog and release.

1. Create a normal tag: `git tag <tagname>` (Always start tag name by `v`)
2. Push tag to remote: `git push origin <tagname>`
3. Generate release on Github: `gren release` (add `-P` to generate a pre-release)
4. Generate changelog: `gren changelog -o` (`-o` is for `override`)

## Contributing

**Never** commit directly on master, instead use branches and pull requests.

This projet use [Prettier](https://prettier.io/) to format code.

We recommend using VSCode with these extensions:

* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
* [Flow Language Support](https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode)
