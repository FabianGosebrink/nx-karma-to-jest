# Nx Karma To Jest Schematic for Angular Projects

> First alpha, not released yet, will come soon

![commandline usage](.github/cmd.png 'Commandline usage')

## Description

This schematic will migrate your Nx Workspace from Karma to Jest. It will scan the workspace, find all projects and lib and update them all including the workspace itself.

## Actions

This schematic will

- Create Jest files inside your project/lib folders
- Delete Karma files inside your project/lib folders
- update testing section for your project/lib in the `angular.json` file
- update the schematic test runner in the `angular.json` file from `karma` to `jest`
- create Jest files on root level
- delete Karma file on root level
- modify `package.json` (remoing Karma deps, adding Jest deps) and install them
