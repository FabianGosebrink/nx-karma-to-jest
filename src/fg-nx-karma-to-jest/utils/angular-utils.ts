import { WorkspaceDefinition } from '@angular-devkit/core/src/workspace';

export const ANGULAR_JSON_FILENAME = 'angular.json';
export function getAngularWorkspaceObject(angularJsonFile: Buffer) {
  return JSON.parse(angularJsonFile.toString('utf-8')) as WorkspaceDefinition;
}
