import { SchematicsException, Tree } from '@angular-devkit/schematics';

export const ANGULAR_JSON_FILENAME = 'angular.json';
export const NX_ANGULAR_APPLICATION_IDENTIFIER = '@nrwl/angular:application';
export const NX_ANGULAR_LIBRARY_IDENTIFIER = '@nrwl/angular:library';

export function safeFileDelete(tree: Tree, path: string): boolean {
  if (tree.exists(path)) {
    tree.delete(path);
    return true;
  } else {
    return false;
  }
}

export function getAngularWorkspace(tree: Tree) {
  const workspaceConfig = tree.read(ANGULAR_JSON_FILENAME);

  if (!workspaceConfig) {
    throw new SchematicsException(
      'Could not find Angular workspace configuration'
    );
  }

  const workspaceContent = workspaceConfig.toString();
  const workspace = JSON.parse(workspaceContent);

  return workspace;
}
