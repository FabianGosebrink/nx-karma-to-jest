import { experimental } from '@angular-devkit/core';
import { Rule } from '@angular-devkit/schematics';
import { createRootJestFiles } from './create-root-jest-files';
import { deleteRootKarmaFiles } from './delete-root-karma-files';
import { modifyDependenciesInPackageJson } from './modify-dependencies';
import { updateAngularJson } from './update-angularjson';

export function getRulesForWorkspaceRoot(
  workspace: experimental.workspace.WorkspaceSchema
) {
  let rulesToApply: Rule[] = [];

  rulesToApply.push(updateAngularJson(workspace));
  rulesToApply.push(createRootJestFiles());
  rulesToApply.push(deleteRootKarmaFiles());
  rulesToApply.push(modifyDependenciesInPackageJson());

  return rulesToApply;
}
