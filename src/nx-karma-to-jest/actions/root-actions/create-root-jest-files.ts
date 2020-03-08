import { SchematicContext, Tree, Rule } from '@angular-devkit/schematics';

const ROOT_JEST_CONFIG = `
module.exports = {
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
      '^.+\\.(ts|js|html)$': 'ts-jest'
  },
  resolver: '@nrwl/jest/plugins/resolver',
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageReporters: ['html']
};
`;

export function createRootJestFiles(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    createRootJestConfig(tree, _context);
    return tree;
  };
}

function createRootJestConfig(tree: Tree, context: SchematicContext) {
  const path = `./jest.config.js`;
  if (tree.exists(path)) {
    context.logger.info(`${path} already exists, skipping`);
    return;
  }

  tree.create(path, ROOT_JEST_CONFIG);
}
