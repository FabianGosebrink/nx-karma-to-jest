import { Tree, SchematicContext, Rule } from '@angular-devkit/schematics';
import { safeFileDelete } from '../../utils/angular-utils';

export function deleteRootKarmaFiles(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const rootFilesToDelete = [`karma.conf.js`];

    rootFilesToDelete.forEach(file => {
      const fileNameAndPath = `${file}`;
      if (tree.exists(fileNameAndPath)) {
        safeFileDelete(tree, fileNameAndPath);
      }
    });

    return tree;
  };
}
