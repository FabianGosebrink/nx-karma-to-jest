import {
  SchematicTestRunner,
  UnitTestTree
} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import { Schema as ApplicationOptions } from '@schematics/angular/application/schema';

const collectionPath = path.join(__dirname, '../collection.json');

describe('nx-karma-to-jest', () => {
  const runner = new SchematicTestRunner('schematics', collectionPath);

  const workspaceOptions: WorkspaceOptions = {
    name: 'workspace',
    newProjectRoot: 'projects',
    version: '6.0.0'
  };

  const appOptions: ApplicationOptions = {
    name: 'bar',
    inlineStyle: false,
    inlineTemplate: false,
    routing: false,
    skipTests: false,
    skipPackageJson: false
  };

  let appTree: UnitTestTree;
  beforeEach(() => {
    appTree = runner.runExternalSchematic(
      '@schematics/angular',
      'workspace',
      workspaceOptions
    );
    appTree = runner.runExternalSchematic(
      '@schematics/angular',
      'application',
      appOptions,
      appTree
    );
  });

  it('works', async () => {
    // const tree = await runner.runSchematicAsync(
    //   'nx-karma-to-jest',
    //   {},
    //   appTree
    // );
    // console.log(tree.files);
    //expect(tree.files).toEqual([]);
  });
});
