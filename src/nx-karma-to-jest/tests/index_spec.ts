import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { Tree } from '@angular-devkit/schematics';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';

const collectionPath = path.join(__dirname, '../../collection.json');

const ANGULAR_JSON_BEFORE = {
  version: 1,
  projects: {
    myapp: {
      projectType: 'application',
      schematics: {},
      root: 'apps/myapp',
      sourceRoot: 'apps/myapp/src',
      prefix: 'schematics-test',
      architect: {
        build: {
          builder: '@angular-devkit/build-angular:browser',
          options: {
            outputPath: 'dist/apps/myapp',
            index: 'apps/myapp/src/index.html',
            main: 'apps/myapp/src/main.ts',
            polyfills: 'apps/myapp/src/polyfills.ts',
            tsConfig: 'apps/myapp/tsconfig.app.json',
            aot: true,
            assets: ['apps/myapp/src/favicon.ico', 'apps/myapp/src/assets'],
            styles: ['apps/myapp/src/styles.css'],
            scripts: []
          },
          configurations: {
            production: {
              fileReplacements: [
                {
                  replace: 'apps/myapp/src/environments/environment.ts',
                  with: 'apps/myapp/src/environments/environment.prod.ts'
                }
              ],
              optimization: true,
              outputHashing: 'all',
              sourceMap: false,
              extractCss: true,
              namedChunks: false,
              extractLicenses: true,
              vendorChunk: false,
              buildOptimizer: true,
              budgets: [
                {
                  type: 'initial',
                  maximumWarning: '2mb',
                  maximumError: '5mb'
                },
                {
                  type: 'anyComponentStyle',
                  maximumWarning: '6kb',
                  maximumError: '10kb'
                }
              ]
            }
          }
        },
        serve: {
          builder: '@angular-devkit/build-angular:dev-server',
          options: {
            browserTarget: 'myapp:build'
          },
          configurations: {
            production: {
              browserTarget: 'myapp:build:production'
            }
          }
        },
        'extract-i18n': {
          builder: '@angular-devkit/build-angular:extract-i18n',
          options: {
            browserTarget: 'myapp:build'
          }
        },
        lint: {
          builder: '@angular-devkit/build-angular:tslint',
          options: {
            tsConfig: [
              'apps/myapp/tsconfig.app.json',
              'apps/myapp/tsconfig.spec.json'
            ],
            exclude: ['**/node_modules/**', '!apps/myapp/**']
          }
        },
        test: {
          builder: '@angular-devkit/build-angular:karma',
          options: {
            main: 'apps/myapp/src/test.ts',
            tsConfig: 'apps/myapp/tsconfig.spec.json',
            karmaConfig: 'apps/myapp/karma.conf.js',
            polyfills: 'apps/myapp/src/polyfills.ts',
            styles: [],
            scripts: [],
            assets: []
          }
        }
      }
    },
    'myapp-e2e': {
      root: 'apps/myapp-e2e',
      sourceRoot: 'apps/myapp-e2e/src',
      projectType: 'application',
      architect: {
        e2e: {
          builder: '@nrwl/cypress:cypress',
          options: {
            cypressConfig: 'apps/myapp-e2e/cypress.json',
            tsConfig: 'apps/myapp-e2e/tsconfig.e2e.json',
            devServerTarget: 'myapp:serve'
          },
          configurations: {
            production: {
              devServerTarget: 'myapp:serve:production'
            }
          }
        },
        lint: {
          builder: '@angular-devkit/build-angular:tslint',
          options: {
            tsConfig: ['apps/myapp-e2e/tsconfig.e2e.json'],
            exclude: ['**/node_modules/**', '!apps/myapp-e2e/**']
          }
        }
      }
    },
    'shared-lib1': {
      projectType: 'library',
      root: 'libs/shared/lib1',
      sourceRoot: 'libs/shared/lib1/src',
      prefix: 'schematics-test',
      architect: {
        lint: {
          builder: '@angular-devkit/build-angular:tslint',
          options: {
            tsConfig: [
              'libs/shared/lib1/tsconfig.lib.json',
              'libs/shared/lib1/tsconfig.spec.json'
            ],
            exclude: ['**/node_modules/**', '!libs/shared/lib1/**']
          }
        },
        test: {
          builder: '@angular-devkit/build-angular:karma',
          options: {
            main: 'libs/shared/lib1/src/test.ts',
            tsConfig: 'libs/shared/lib1/tsconfig.spec.json',
            karmaConfig: 'libs/shared/lib1/karma.conf.js'
          }
        }
      },
      schematics: {}
    },
    lib2: {
      projectType: 'library',
      root: 'libs/lib2',
      sourceRoot: 'libs/lib2/src',
      prefix: 'schematics-test',
      architect: {
        lint: {
          builder: '@angular-devkit/build-angular:tslint',
          options: {
            tsConfig: [
              'libs/lib2/tsconfig.lib.json',
              'libs/lib2/tsconfig.spec.json'
            ],
            exclude: ['**/node_modules/**', '!libs/lib2/**']
          }
        },
        test: {
          builder: '@angular-devkit/build-angular:karma',
          options: {
            main: 'libs/lib2/src/test.ts',
            tsConfig: 'libs/lib2/tsconfig.spec.json',
            karmaConfig: 'libs/lib2/karma.conf.js'
          }
        }
      },
      schematics: {}
    }
  },
  cli: {
    defaultCollection: '@nrwl/angular',
    analytics: false
  },
  schematics: {
    '@nrwl/angular:application': {
      unitTestRunner: 'karma',
      e2eTestRunner: 'cypress'
    },
    '@nrwl/angular:library': {
      unitTestRunner: 'karma'
    }
  },
  defaultProject: 'myapp'
};

const PACKAGE_JSON = {
  name: 'schematics-test',
  version: '0.0.0',
  license: 'MIT',
  scripts: {},
  private: true,
  dependencies: {
    '@angular/animations': '9.0.0',
    '@angular/common': '9.0.0',
    '@angular/compiler': '9.0.0',
    '@angular/core': '9.0.0',
    '@angular/forms': '9.0.0',
    '@angular/platform-browser': '9.0.0',
    '@angular/platform-browser-dynamic': '9.0.0',
    '@angular/router': '9.0.0',
    'core-js': '^2.5.4',
    rxjs: '~6.5.0',
    'zone.js': '^0.10.2'
  },
  devDependencies: {
    '@angular/cli': '9.0.1',
    '@nrwl/angular': '^9.0.4',
    '@nrwl/workspace': '9.0.4',
    '@types/node': '~8.9.4',
    dotenv: '6.2.0',
    eslint: '6.1.0',
    prettier: '1.18.2',
    'ts-node': '~7.0.0',
    tslint: '~5.11.0',
    typescript: '~3.7.4',
    '@angular/compiler-cli': '9.0.0',
    '@angular/language-service': '9.0.0',
    '@angular-devkit/build-angular': '0.900.1',
    codelyzer: '~5.0.1',
    karma: '~4.0.0',
    'karma-chrome-launcher': '~2.2.0',
    'karma-coverage-istanbul-reporter': '~2.0.1',
    'karma-jasmine': '~1.1.2',
    'karma-jasmine-html-reporter': '^0.2.2',
    'jasmine-core': '~2.99.1',
    'jasmine-spec-reporter': '~4.2.1',
    '@types/jasmine': '~2.8.8',
    cypress: '^3.8.2',
    '@nrwl/cypress': '9.0.4'
  }
};

describe('nx-karma-to-jest', () => {
  const runner = new SchematicTestRunner('schematics', collectionPath);
  let appTree: Tree;
  beforeEach(() => {
    appTree = Tree.empty();
    appTree.create(`angular.json`, JSON.stringify(ANGULAR_JSON_BEFORE));
    appTree.create(`package.json`, JSON.stringify(PACKAGE_JSON));
    appTree.create(`karma.conf.js`, '');
    appTree.create(`/apps/myapp/karma.conf.js`, '');
    appTree.create(`/apps/myapp/src/test.ts`, '');
    appTree.create(`/apps/myapp/tsconfig.spec.json`, '');
    appTree.create(`/libs/lib2/karma.conf.js`, '');
    appTree.create(`/libs/lib2/tsconfig.spec.json`, '');
    appTree.create(`/libs/lib2/src/test.ts`, '');
    appTree.create(`/libs/shared/lib1/karma.conf.js`, '');
    appTree.create(`/libs/shared/lib1/tsconfig.spec.json`, '');
    appTree.create(`/libs/shared/lib1/src/test.ts`, '');
  });

  it('has required files', () => {
    expect(appTree.exists('/angular.json')).toBeTrue();
    expect(appTree.exists('/package.json')).toBeTrue();
  });

  describe('Create jest.config.js files', () => {
    it('on root level', async () => {
      const tree = await runner
        .runSchematicAsync('nx-karma-to-jest', {}, appTree)
        .toPromise();

      expect(tree.exists('/jest.config.js')).toBeTrue();
    });

    it('on app level', async () => {
      const tree = await runner
        .runSchematicAsync('nx-karma-to-jest', {}, appTree)
        .toPromise();

      expect(tree.exists('/apps/myapp/jest.config.js')).toBeTrue();
    });

    it('on lib level', async () => {
      const tree = await runner
        .runSchematicAsync('nx-karma-to-jest', {}, appTree)
        .toPromise();

      expect(tree.exists('/libs/lib2/jest.config.js')).toBeTrue();
    });

    it('on nested lib level', async () => {
      const tree = await runner
        .runSchematicAsync('nx-karma-to-jest', {}, appTree)
        .toPromise();

      expect(tree.exists('/libs/shared/lib1/jest.config.js')).toBeTrue();
    });
  });

  describe('Create test-setup.ts files', () => {
    it('on app src level', async () => {
      const tree = await runner
        .runSchematicAsync('nx-karma-to-jest', {}, appTree)
        .toPromise();
      expect(tree.exists('/apps/myapp/src/test-setup.ts')).toBeTrue();
    });

    it('on lib src level', async () => {
      const tree = await runner
        .runSchematicAsync('nx-karma-to-jest', {}, appTree)
        .toPromise();

      expect(tree.exists('/libs/lib2/src/test-setup.ts')).toBeTrue();
    });

    it('on nested lib src level', async () => {
      const tree = await runner
        .runSchematicAsync('nx-karma-to-jest', {}, appTree)
        .toPromise();

      expect(tree.exists('/libs/shared/lib1/src/test-setup.ts')).toBeTrue();
    });
  });

  describe('Deletes karma.conf.js files', () => {
    it('on root level', async () => {
      expect(appTree.exists('/karma.conf.js')).toBeTrue();

      const tree = await runner
        .runSchematicAsync('nx-karma-to-jest', {}, appTree)
        .toPromise();

      expect(tree.exists('/karma.conf.js')).toBeFalse();
    });

    it('on app level', async () => {
      expect(appTree.exists('/apps/myapp/karma.conf.js')).toBeTrue();
      const tree = await runner
        .runSchematicAsync('nx-karma-to-jest', {}, appTree)
        .toPromise();

      expect(tree.exists('/apps/myapp/karma.conf.js')).toBeFalse();
    });

    it('on lib level', async () => {
      expect(appTree.exists('/libs/lib2/karma.conf.js')).toBeTrue();
      const tree = await runner
        .runSchematicAsync('nx-karma-to-jest', {}, appTree)
        .toPromise();

      expect(tree.exists('/libs/lib2/karma.conf.js')).toBeFalse();
    });

    it('on nested lib level', async () => {
      expect(appTree.exists('/libs/shared/lib1/karma.conf.js')).toBeTrue();
      const tree = await runner
        .runSchematicAsync('nx-karma-to-jest', {}, appTree)
        .toPromise();

      expect(tree.exists('/libs/shared/lib1/karma.conf.js')).toBeFalse();
    });
  });

  describe('Deletes test.ts files', () => {
    it('on app src level', async () => {
      expect(appTree.exists('/apps/myapp/src/test.ts')).toBeTrue();
      const tree = await runner
        .runSchematicAsync('nx-karma-to-jest', {}, appTree)
        .toPromise();

      expect(tree.exists('/apps/myapp/src/test.ts')).toBeFalse();
    });

    it('on lib src level', async () => {
      expect(appTree.exists('/libs/lib2/src/test.ts')).toBeTrue();
      const tree = await runner
        .runSchematicAsync('nx-karma-to-jest', {}, appTree)
        .toPromise();

      expect(tree.exists('/libs/lib2/src/test.ts')).toBeFalse();
    });

    it('on nested lib src level', async () => {
      expect(appTree.exists('/libs/shared/lib1/src/test.ts')).toBeTrue();
      const tree = await runner
        .runSchematicAsync('nx-karma-to-jest', {}, appTree)
        .toPromise();

      expect(tree.exists('/libs/shared/lib1/src/test.ts')).toBeFalse();
    });
  });

  describe('Modifies tsconfig.spec.json', () => {
    it('on app level', async () => {
      const expected = {
        extends: './tsconfig.json',
        compilerOptions: {
          outDir: '../../dist/out-tsc',
          module: 'commonjs',
          types: ['jest', 'node']
        },
        files: ['src/test-setup.ts'],
        include: ['**/*.spec.ts', '**/*.d.ts']
      };

      const tree = await runner
        .runSchematicAsync('nx-karma-to-jest', {}, appTree)
        .toPromise();

      const newContent = tree.readContent('/apps/myapp/tsconfig.spec.json');
      const newObject = JSON.parse(newContent);
      expect(newObject).toEqual(expected);
    });

    it('on lib level', async () => {
      const expected = {
        extends: './tsconfig.json',
        compilerOptions: {
          outDir: '../../dist/out-tsc',
          module: 'commonjs',
          types: ['jest', 'node']
        },
        files: ['src/test-setup.ts'],
        include: ['**/*.spec.ts', '**/*.d.ts']
      };

      const tree = await runner
        .runSchematicAsync('nx-karma-to-jest', {}, appTree)
        .toPromise();

      const newContent = tree.readContent('/libs/lib2/tsconfig.spec.json');
      const newObject = JSON.parse(newContent);
      expect(newObject).toEqual(expected);
    });

    it('on nested lib level', async () => {
      const expected = {
        extends: './tsconfig.json',
        compilerOptions: {
          outDir: '../../../dist/out-tsc',
          module: 'commonjs',
          types: ['jest', 'node']
        },
        files: ['src/test-setup.ts'],
        include: ['**/*.spec.ts', '**/*.d.ts']
      };

      const tree = await runner
        .runSchematicAsync('nx-karma-to-jest', {}, appTree)
        .toPromise();

      const newContent = tree.readContent(
        '/libs/shared/lib1/tsconfig.spec.json'
      );
      const newObject = JSON.parse(newContent);
      expect(newObject).toEqual(expected);
    });
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
