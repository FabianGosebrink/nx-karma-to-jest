import {
  Tree,
  SchematicContext,
  SchematicsException
} from '@angular-devkit/schematics';
import { experimental } from '@angular-devkit/core';
import { safeFileDelete } from '../utils/angular-utils';

export function deleteKarmaFiles(
  tree: Tree,
  _context: SchematicContext,
  workspace: experimental.workspace.WorkspaceSchema,
  projectName: string
) {
  const projectFilesToDelete = [`src/test.ts`, `karma.conf.js`];
  const rootFilesToDelete = [`karma.conf.js`];

  const project = workspace.projects[projectName];

  if (!project?.architect) {
    throw new SchematicsException(`Project ${projectName} not found`);
  }
  projectFilesToDelete.forEach(file => {
    const fileNameAndPath = `${project.root}/${file}`;
    if (tree.exists(fileNameAndPath)) {
      safeFileDelete(tree, fileNameAndPath);
    }
  });

  rootFilesToDelete.forEach(file => {
    const fileNameAndPath = `${file}`;
    if (tree.exists(fileNameAndPath)) {
      safeFileDelete(tree, fileNameAndPath);
    }
  });
}
