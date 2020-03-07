import {
  SchematicContext,
  Tree,
  SchematicsException
} from '@angular-devkit/schematics';
import {
  ANGULAR_JSON_FILENAME,
  NX_ANGULAR_APPLICATION_IDENTIFIER,
  NX_ANGULAR_LIBRARY_IDENTIFIER
} from '../utils/angular-utils';
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
  if (!workspace?.schematics) {
    _context.logger.error(`\tNo schematic section found`);
    return;
  }

  if (!workspace?.schematics[NX_ANGULAR_LIBRARY_IDENTIFIER]) {
    _context.logger.error(`\tNo @nrwl/angular:application section found`);
    return;
  }

  workspace.schematics[NX_ANGULAR_LIBRARY_IDENTIFIER].unitTestRunner = 'jest';

  if (!workspace?.schematics[NX_ANGULAR_APPLICATION_IDENTIFIER]) {
    return;
  }

  workspace.schematics[NX_ANGULAR_APPLICATION_IDENTIFIER].unitTestRunner =
    'jest';
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
