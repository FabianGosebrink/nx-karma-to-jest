import {
  SchematicContext,
  Tree,
  SchematicsException,
  Rule
} from '@angular-devkit/schematics';
import { experimental } from '@angular-devkit/core';

export function createProjectsJestFiles(
  workspace: experimental.workspace.WorkspaceSchema,
  projectName: string
): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const project = workspace.projects[projectName];

    if (!project?.architect) {
      throw new SchematicsException(`Project ${projectName} not found`);
    }

    createProjectJestConfig(tree, project, _context, projectName);
    createProjectSpecTsConfig(tree, project, _context);
    createTestSetup(tree, project, _context);

    return tree;
  };
}

function createProjectJestConfig(
  tree: Tree,
  project: experimental.workspace.WorkspaceProject,
  context: SchematicContext,
  projectName: string
) {
  const path = `${project.root}/jest.config.js`;
  if (tree.exists(path)) {
    context.logger.info(`${path} already exists, skipping`);
    return;
  }

  const projectType = project.projectType === 'application' ? 'app' : 'lib';
  const folderDeepness = calculateTraverseUptoRootPath(project.root);
  tree.create(
    path,
    `
module.exports = {
  name: '${projectName}',
  preset: '${folderDeepness}jest.config.js',
  coverageDirectory: '${folderDeepness}coverage/${projectType}/${projectName}',
  snapshotSerializers: [
      'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
      'jest-preset-angular/build/AngularSnapshotSerializer.js',
      'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
`
  );
}

function createProjectSpecTsConfig(
  tree: Tree,
  project: experimental.workspace.WorkspaceProject,
  context: SchematicContext
) {
  const path = `${project.root}/tsconfig.spec.json`;
  if (!tree.exists(path)) {
    context.logger.info(`${path} does not exist, skipping`);
    return;
  }
  const folderDeepness = calculateTraverseUptoRootPath(project.root);
  tree.overwrite(
    path,
    `
{
    "extends": "./tsconfig.json",
    "compilerOptions": {
        "outDir": "${folderDeepness}dist/out-tsc",
        "module": "commonjs",
        "types": [
            "jest",
            "node"
        ]
    },
    "files": [
        "src/test-setup.ts"
    ],
    "include": [
        "**/*.spec.ts",
        "**/*.d.ts"
    ]
}
`
  );
}

function createTestSetup(
  tree: Tree,
  project: experimental.workspace.WorkspaceProject,
  context: SchematicContext
) {
  const path = `${project.sourceRoot}/test-setup.ts`;
  if (tree.exists(path)) {
    context.logger.info(`${path} already exists, skipping`);
    return;
  }

  tree.create(
    `${project.sourceRoot}/test-setup.ts`,
    `import 'jest-preset-angular';`
  );
}

function calculateTraverseUptoRootPath(projectRoot: string) {
  let toReturn = '../';
  const folderDeepness = projectRoot.split('/').length - 1;

  for (let index = 0; index < folderDeepness; index++) {
    toReturn += '../';
  }

  return toReturn;
}
