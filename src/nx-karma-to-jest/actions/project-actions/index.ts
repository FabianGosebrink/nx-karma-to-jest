import { WorkspaceSchema } from '@angular-devkit/core/src/experimental/workspace';
import { SchematicContext, Rule } from '@angular-devkit/schematics';
import { hasTestingSection } from '../../utils/angular-utils';
import { addTestingSectionToAngularJson } from './add-testing-section-to-angularjson';
import { deleteProjectKarmaFiles } from './delete-projects-karma-files';
import { createProjectsJestFiles } from './create-projects-jest-files';

export function getRulesForProjectsAndLibs(
  workspace: WorkspaceSchema,
  _context: SchematicContext
) {
  let projectRules: Rule[] = [];
  const allProjects = Object.entries(workspace.projects);

  for (let [projectName, project] of allProjects) {
    if (!hasTestingSection(project, _context)) {
      _context.logger.debug(
        `${projectName} has no testing section, skipping...`
      );
      continue;
    }

    projectRules.push(createProjectsJestFiles(workspace, projectName));
    projectRules.push(deleteProjectKarmaFiles(workspace, projectName));
    projectRules.push(addTestingSectionToAngularJson(workspace, projectName));
  }

  return projectRules;
}
