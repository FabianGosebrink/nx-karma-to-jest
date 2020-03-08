import { WorkspaceSchema } from '@angular-devkit/core/src/experimental/workspace';
import { Rule } from '@angular-devkit/schematics';
import { updateAngularJson } from './update-angularjson';
import { createRootJestFiles } from './create-root-jest-files';
import { deleteRootKarmaFiles } from './delete-root-karma-files';
import { modifyDependenciesInPackageJson } from './modify-dependencies';

export function getRulesForWorkspaceRoot(workspace: WorkspaceSchema) {
  let rulesToApply: Rule[] = [];

  rulesToApply.push(updateAngularJson(workspace));
  rulesToApply.push(createRootJestFiles());
  rulesToApply.push(deleteRootKarmaFiles());
  rulesToApply.push(modifyDependenciesInPackageJson());

  return rulesToApply;
}
