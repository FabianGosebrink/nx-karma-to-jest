import {
  Rule,
  SchematicContext,
  Tree,
  chain
} from '@angular-devkit/schematics';
import { getAngularWorkspace } from './utils/angular-utils';
import { updateProjectsAndLibs } from './actions/project-actions';
import { updateRootWorkspace } from './actions/root-actions';

export function nxKarmaToJest(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const workspace = getAngularWorkspace(tree);

    const projectAndLibActions = updateProjectsAndLibs(workspace, _context);
    const workspaceActions = updateRootWorkspace(workspace);

    const rulesToApply = [...projectAndLibActions, ...workspaceActions];

    return chain(rulesToApply)(tree, _context);
  };
}
