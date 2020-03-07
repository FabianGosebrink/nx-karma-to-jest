import {
  Rule,
  SchematicContext,
  Tree,
  SchematicsException
} from '@angular-devkit/schematics';
import { ANGULAR_JSON_FILENAME, isRealProject } from './utils/angular-utils';
import { experimental } from '@angular-devkit/core';
import {
  updateAngularJson,
  createJestFiles,
  deleteKarmaFiles,
  modifyDependenciesInPackageJson
} from './actions';

export function fgNxKarmaToJest(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const workspaceConfig = tree.read(ANGULAR_JSON_FILENAME);

    if (!workspaceConfig) {
      throw new SchematicsException(
        'Could not find Angular workspace configuration'
      );
    }

    const workspaceContent = workspaceConfig.toString();
    const workspace: experimental.workspace.WorkspaceSchema = JSON.parse(
      workspaceContent
    );

    const allProjects = Object.entries(workspace.projects);

    for (let [projectName, project] of allProjects) {
      const projectType = project.projectType === 'application' ? 'app' : 'lib';

      if (!isRealProject(project, _context)) {
        _context.logger.info(
          `${projectName} (${projectType}) has no testing section, skipping...`
        );
        continue;
      }

      _context.logger.info(`Processing: ${projectName} (${projectType})`);
      updateAngularJson(tree, _context, workspace, projectName);
      createJestFiles(tree, _context, workspace, projectName);
      deleteKarmaFiles(tree, _context, workspace, projectName);
      _context.logger.info(`Done processing: ${projectName} (${projectType})`);
    }

    modifyDependenciesInPackageJson(tree, _context);

    return tree;
  };
}
