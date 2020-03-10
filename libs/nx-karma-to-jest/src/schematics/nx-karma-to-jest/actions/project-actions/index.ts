import { experimental } from '@angular-devkit/core';
import { Rule, SchematicsException } from '@angular-devkit/schematics';
import { addProjectTestingSectionToAngularJson } from './add-testing-section-to-angularjson';
import { createProjectsJestFiles } from './create-projects-jest-files';
import { deleteProjectKarmaFiles } from './delete-projects-karma-files';

export function getRulesForProjectsAndLibs(
  workspace: experimental.workspace.WorkspaceSchema
) {
  let projectRules: Rule[] = [];

  const allProjects = Object.keys(workspace.projects);

  for (const projectName of allProjects) {
    const currentProject = workspace.projects[projectName];

    if (!hasTestingSection(currentProject)) {
      continue;
    }

    projectRules.push(createProjectsJestFiles(workspace, projectName));
    projectRules.push(deleteProjectKarmaFiles(workspace, projectName));
    projectRules.push(
      addProjectTestingSectionToAngularJson(workspace, projectName)
    );
  }

  return projectRules;
}

export function hasTestingSection(
  project: experimental.workspace.WorkspaceProject
) {
  if (!project.architect) {
    throw new SchematicsException(`no 'architect' section found`);
  }

  return !!project.architect.test;
}
