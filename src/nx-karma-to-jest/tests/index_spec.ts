import {
  // SchematicTestRunner,
  UnitTestTree,
  SchematicTestRunner
} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import * as fs from 'fs';
import { EmptyTree } from '@angular-devkit/schematics';

const collectionPath = path.join(__dirname, '../../collection.json');
const mockPath = path.join(__dirname, 'mocks');

describe('nx-karma-to-jest', () => {
  const runner = new SchematicTestRunner('schematics', collectionPath);
  let appTree: UnitTestTree;
  beforeEach(() => {
    appTree = new UnitTestTree(new EmptyTree());

    fs.readdirSync(mockPath)
      .map(x => {
        return {
          fileName: x,
          content: fs.readFileSync(path.join(mockPath, x))
        };
      })
      .map(file => appTree.create(file.fileName, file.content));
  });

  it('has angular.json file', () => {
    expect(appTree.files.find(x => x === '/angular.json')).toBeDefined();
  });

  describe('modified angular json', () => {
    it('app test section', async () => {
      const expected = {
        builder: '@nrwl/jest:jest',
        options: {
          jestConfig: 'apps/myapp/jest.config.js',
          tsConfig: 'apps/myapp/tsconfig.spec.json',
          passWithNoTests: true,
          setupFile: 'apps/myapp/src/test-setup.ts'
        }
      };

      const tree = await runner
        .runSchematicAsync('nx-karma-to-jest', {}, appTree)
        .toPromise();
      const newContent = tree.readContent('/angular.json');
      const newObject = JSON.parse(newContent);
      expect(newObject.projects.myapp.architect.test).toEqual(expected);
    });

    it('lib test section', async () => {
      const expected = {
        builder: '@nrwl/jest:jest',
        options: {
          jestConfig: 'libs/lib2/jest.config.js',
          tsConfig: 'libs/lib2/tsconfig.spec.json',
          passWithNoTests: true,
          setupFile: 'libs/lib2/src/test-setup.ts'
        }
      };

      const tree = await runner
        .runSchematicAsync('nx-karma-to-jest', {}, appTree)
        .toPromise();
      const newContent = tree.readContent('/angular.json');
      const newObject = JSON.parse(newContent);
      expect(newObject.projects.lib2.architect.test).toEqual(expected);
    });

    it('nested lib test section', async () => {
      const expected = {
        builder: '@nrwl/jest:jest',
        options: {
          jestConfig: 'libs/shared/lib1/jest.config.js',
          tsConfig: 'libs/shared/lib1/tsconfig.spec.json',
          passWithNoTests: true,
          setupFile: 'libs/shared/lib1/src/test-setup.ts'
        }
      };

      const tree = await runner
        .runSchematicAsync('nx-karma-to-jest', {}, appTree)
        .toPromise();
      const newContent = tree.readContent('/angular.json');
      const newObject = JSON.parse(newContent);
      expect(newObject.projects['shared-lib1'].architect.test).toEqual(
        expected
      );
    });
  });
});
