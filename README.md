# Nx Karma To Jest Schematic for Angular Projects

![TravisCi build](https://travis-ci.org/FabianGosebrink/nx-karma-to-jest.svg?branch=master 'Travis CI Build')
[![npm (scoped)](https://img.shields.io/npm/v/@offeringsolutions/nx-karma-to-jest.svg)](https://www.npmjs.com/package/@offeringsolutions/nx-karma-to-jest)



![commandline usage](.github/ng-cmd.png 'Commandline usage')

## Usage

```
ng add @offeringsolutions/nx-karma-to-jest
```

## Description

This schematic will migrate your Nx Workspace from Karma to Jest. It will scan the workspace, find all projects and lib and update them all including the workspace itself.

## Actions

This schematic will

- Create Jest files inside your project/lib folders
- Delete Karma files inside your project/lib folders
- Update testing section for your project/lib in the `angular.json` file
- Update the schematic test runner in the `angular.json` file from `karma` to `jest`
- Create Jest files on root level
- Delete Karma files on root level
- Modify `package.json` (removing Karma deps, adding Jest deps) and install them
