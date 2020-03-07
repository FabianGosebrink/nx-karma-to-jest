import {
  SchematicContext,
  Tree,
  SchematicsException
} from '@angular-devkit/schematics';
import { ANGULAR_JSON_FILENAME } from '../utils/angular-utils';
import { experimental } from '@angular-devkit/core';

export function updateAngularJson(
  tree: Tree,
  _context: SchematicContext,
  workspace: experimental.workspace.WorkspaceSchema,
  projectName: string
) {
  updateProjectsTestSection(tree, _context, workspace, projectName);
  updateSchematicTestRunner(workspace, _context);
}

function updateSchematicTestRunner(
  workspace: experimental.workspace.WorkspaceSchema,
  _context: SchematicContext
) {
  const nxAngularAppSection = '@nrwl/angular:application';
  const nxAngularLibSection = '@nrwl/angular:library';

  if (!workspace?.schematics) {
    _context.logger.info(`\tNo schematic section found`);
    return;
  }

  if (!workspace?.schematics[nxAngularAppSection]) {
    _context.logger.info(`\tNo @nrwl/angular:application section found`);
    return;
  }

  workspace.schematics[nxAngularAppSection].unitTestRunner = 'jest';

  if (!workspace?.schematics[nxAngularLibSection]) {
    return;
  }

  workspace.schematics[nxAngularLibSection].unitTestRunner = 'jest';
}

function updateProjectsTestSection(
  tree: Tree,
  _context: SchematicContext,
  workspace: experimental.workspace.WorkspaceSchema,
  projectName: string
) {
  const project = workspace.projects[projectName];

  if (!project?.architect) {
    throw new SchematicsException(`Project ${projectName} not found`);
  }

  project.architect.test = getJestTestingObject(project.root);

  _context.logger.info(`\tUpdated Testsection for ${projectName}`);

  tree.overwrite(ANGULAR_JSON_FILENAME, JSON.stringify(workspace, null, '\t'));
}

function getJestTestingObject(projectRoot: string) {
  return {
    builder: '@nrwl/jest:jest',
    options: {
      jestConfig: `${projectRoot}/jest.config.js`,
      tsConfig: `${projectRoot}/tsconfig.spec.json`,
      passWithNoTests: true,
      setupFile: `${projectRoot}/src/test-setup.ts`
    }
  };
}
