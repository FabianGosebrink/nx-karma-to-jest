import { WorkspaceDefinition } from '@angular-devkit/core/src/workspace';
import { experimental } from '@angular-devkit/core';
import {
  SchematicsException,
  SchematicContext,
  Tree
} from '@angular-devkit/schematics';

export const ANGULAR_JSON_FILENAME = 'angular.json';
export const NX_ANGULAR_APPLICATION_IDENTIFIER = '@nrwl/angular:application';
export const NX_ANGULAR_LIBRARY_IDENTIFIER = '@nrwl/angular:library';
export function getAngularWorkspaceObject(angularJsonFile: Buffer) {
  return JSON.parse(angularJsonFile.toString('utf-8')) as WorkspaceDefinition;
}

export function hasTestingSection(
  project: experimental.workspace.WorkspaceProject,
  _context: SchematicContext
) {
  if (!project?.architect) {
    throw new SchematicsException(`no 'architect' section found`);
  }

  return !!project?.architect['test'];
}
export function safeFileDelete(tree: Tree, path: string): boolean {
  if (tree.exists(path)) {
    tree.delete(path);
    return true;
  } else {
    return false;
  }
}
