import {
  SchematicContext,
  Tree,
  SchematicsException
} from '@angular-devkit/schematics';
import { ANGULAR_JSON_FILENAME } from '../utils/angular-utils';
import { experimental } from '@angular-devkit/core';

export function updateCLIConfig(
  tree: Tree,
  _context: SchematicContext,
  workspace: experimental.workspace.WorkspaceSchema,
  project: experimental.workspace.WorkspaceProject,
  projectName: string
) {
  const testSection = getTestSectionForProject(project);

  if (!testSection) {
    _context.logger.info(` No testsection found for ${projectName}`);
    return;
  }

  const updatedWorkspace = updateTestSectionForProject(
    workspace,
    _context,
    projectName
  );

  tree.overwrite(
    ANGULAR_JSON_FILENAME,
    JSON.stringify(updatedWorkspace, null, '\t')
  );
}

function updateTestSectionForProject(
  workspace: experimental.workspace.WorkspaceSchema,
  _context: SchematicContext,
  projectName: string
) {
  const project = workspace.projects[projectName];

  if (!project?.architect) {
    throw new SchematicsException(
      'Could not find Angular workspace configuration'
    );
  }

  project.architect.test = getJestTestingObject(project.root);

  _context.logger.info(`\tUpdated Testsection for ${projectName}`);

  return workspace;
}

function getTestSectionForProject(
  project: experimental.workspace.WorkspaceProject
) {
  if (!project.architect) {
    throw new SchematicsException(
      'Could not find Angular workspace configuration'
    );
  }
  return project?.architect['test'];
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
