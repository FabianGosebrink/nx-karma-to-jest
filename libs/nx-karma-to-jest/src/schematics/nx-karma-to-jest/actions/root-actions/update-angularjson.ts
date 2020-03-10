import { experimental } from '@angular-devkit/core';
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NX_ANGULAR_APPLICATION_IDENTIFIER, NX_ANGULAR_LIBRARY_IDENTIFIER } from '../../utils/angular-utils';

export function updateAngularJson(
  workspace: experimental.workspace.WorkspaceSchema
): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    updateSchematicTestRunner(workspace, _context);

    return tree;
  };
}

function updateSchematicTestRunner(
  workspace: experimental.workspace.WorkspaceSchema,
  _context: SchematicContext
) {

  if (!workspace.schematics) {
    _context.logger.error(`\tNo schematic section found`);
    return;
  }

  if (!workspace.schematics[NX_ANGULAR_LIBRARY_IDENTIFIER]) {
    _context.logger.error(`\tNo @nrwl/angular:application section found`);
    return;
  }

  workspace.schematics[NX_ANGULAR_LIBRARY_IDENTIFIER].unitTestRunner = 'jest';

  if (!workspace?.schematics[NX_ANGULAR_APPLICATION_IDENTIFIER]) {
    return;
  }

  workspace.schematics[NX_ANGULAR_APPLICATION_IDENTIFIER].unitTestRunner =
    'jest';
}
