import {
  SchematicContext,
  Tree,
  SchematicsException
} from '@angular-devkit/schematics';
import { experimental } from '@angular-devkit/core';

export function createJestFiles(
  tree: Tree,
  context: SchematicContext,
  workspace: experimental.workspace.WorkspaceSchema,
  projectName: string
) {
  const project = workspace.projects[projectName];

  if (!project?.architect) {
    throw new SchematicsException(`Project ${projectName} not found`);
  }

  createJestConfig(tree, project, context);
  createTestSetup(tree, project, context);
}
function createJestConfig(
  tree: Tree,
  project: experimental.workspace.WorkspaceProject,
  context: SchematicContext
) {
  const path = `${project.root}/jest.config.js`;
  if (tree.exists(path)) {
    context.logger.info(`${path} already exists, skipping`);
    return;
  }

  tree.create(
    path,
    `
            module.exports = {
            testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
            transform: {
                '^.+\\.(ts|js|html)$': 'ts-jest'
            },
            resolver: '@nrwl/jest/plugins/resolver',
            moduleFileExtensions: ['ts', 'js', 'html'],
            coverageReporters: ['html']
            };
        `
  );
}

function createTestSetup(
  tree: Tree,
  project: experimental.workspace.WorkspaceProject,
  context: SchematicContext
) {
  const path = `${project.sourceRoot}/test-setup.ts`;
  if (tree.exists(path)) {
    context.logger.info(`${path} already exists, skipping`);
    return;
  }

  tree.create(
    `${project.sourceRoot}/test-setup.ts`,
    `import 'jest-preset-angular';`
  );
}
