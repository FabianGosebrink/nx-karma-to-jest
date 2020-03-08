import {
  Rule,
  SchematicContext,
  Tree,
  chain
} from '@angular-devkit/schematics';
import { getAngularWorkspace } from './utils/angular-utils';
import { getRulesForProjectsAndLibs } from './actions/project-actions';
import { getRulesForWorkspaceRoot } from './actions/root-actions';

export function nxKarmaToJest(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const workspace = getAngularWorkspace(tree);

    const projectAndLibActions = getRulesForProjectsAndLibs(
      workspace,
      _context
    );
    const workspaceActions = getRulesForWorkspaceRoot(workspace);

    const rulesToApply = [...projectAndLibActions, ...workspaceActions];

    return chain(rulesToApply)(tree, _context);
  };
}
