import { Tree, SchematicContext, Rule } from '@angular-devkit/schematics';
import {
  addPackageJsonDependency,
  NodeDependency,
  NodeDependencyType,
  removePackageJsonDependency
} from '@schematics/angular/utility/dependencies';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

const dependenciesToAdd: { [key: string]: string } = {
  'jest-preset-angular': '8.0.0',
  '@nrwl/jest': '9.0.4',
  jest: '25.1.0',
  '@types/jest': '24.9.1',
  'ts-jest': '25.2.1'
};

const dependenciesToRemove = [
  'karma',
  'karma-chrome-launcher',
  'karma-coverage-istanbul-reporter',
  'karma-jasmine',
  'karma-jasmine-html-reporter',
  'jasmine-core',
  'jasmine-spec-reporter',
  '@types/jasmine'
];

export function modifyDependenciesInPackageJson(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    deleteDependenciesFromPackageJson(tree);
    addDependenciesToPackageJson(tree, _context);

    _context.addTask(new NodePackageInstallTask());

    return tree;
  };
}

function addDependenciesToPackageJson(tree: Tree, _context: SchematicContext) {
  for (let pack in dependenciesToAdd) {
    const nodeDependency: NodeDependency = createNodeDependency(
      pack,
      dependenciesToAdd[pack]
    );

    addPackageJsonDependency(tree, nodeDependency);
  }
}

function createNodeDependency(
  packageName: string,
  version: string
): NodeDependency {
  return {
    type: NodeDependencyType.Dev,
    name: packageName,
    version: version,
    overwrite: true
  };
}

function deleteDependenciesFromPackageJson(tree: Tree) {
  dependenciesToRemove.forEach(toRemove => {
    removePackageJsonDependency(tree, toRemove);
  });
}
