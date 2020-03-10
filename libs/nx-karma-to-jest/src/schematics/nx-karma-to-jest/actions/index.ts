import { chain, SchematicContext, Tree } from '@angular-devkit/schematics';
import { getAngularWorkspace } from '../utils/angular-utils';
import { getRulesForProjectsAndLibs } from './project-actions';
import { getRulesForWorkspaceRoot } from './root-actions';

export function runNxKarmaToJest(host: Tree, context: SchematicContext) {
  const workspace = getAngularWorkspace(host);

  const projectAndLibActions = getRulesForProjectsAndLibs(workspace);
  const workspaceActions = getRulesForWorkspaceRoot(workspace);
  const rulesToApply = [...projectAndLibActions, ...workspaceActions];

  return chain(rulesToApply);
}
