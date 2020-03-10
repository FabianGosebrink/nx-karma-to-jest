import { experimental } from '@angular-devkit/core';
import {
  Rule,
  SchematicContext,
  SchematicsException,
  Tree
} from '@angular-devkit/schematics';
import { safeFileDelete } from '../../utils/angular-utils';

export function deleteProjectKarmaFiles(
  workspace: experimental.workspace.WorkspaceSchema,
  projectName: string
): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const projectFilesToDelete = [`src/test.ts`, `karma.conf.js`];

    const project = workspace.projects[
      projectName
    ] as experimental.workspace.WorkspaceProject;

    if (!project.architect) {
      throw new SchematicsException(`Project ${projectName} not found`);
    }
    projectFilesToDelete.forEach(file => {
      const fileNameAndPath = `${project.root}/${file}`;
      if (tree.exists(fileNameAndPath)) {
        safeFileDelete(tree, fileNameAndPath);
      }
    });

    return tree;
  };
}
