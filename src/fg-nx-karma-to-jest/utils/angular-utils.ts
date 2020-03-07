import { WorkspaceDefinition } from '@angular-devkit/core/src/workspace';
import { experimental } from '@angular-devkit/core';
import {
  SchematicsException,
  SchematicContext
} from '@angular-devkit/schematics';

export const ANGULAR_JSON_FILENAME = 'angular.json';
export function getAngularWorkspaceObject(angularJsonFile: Buffer) {
  return JSON.parse(angularJsonFile.toString('utf-8')) as WorkspaceDefinition;
}

export function isRealProject(
  project: experimental.workspace.WorkspaceProject,
  _context: SchematicContext
) {
  if (!project?.architect) {
    throw new SchematicsException(`no 'architect' section found`);
  }

  const testSection = project?.architect['test'];

  if (!testSection) {
    return false;
  }

  return true;
}
