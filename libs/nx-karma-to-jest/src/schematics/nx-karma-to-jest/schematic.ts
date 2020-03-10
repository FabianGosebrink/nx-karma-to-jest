import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { runNxKarmaToJest } from './actions';
import { NxKarmaToJestSchematicSchema } from './schema';

export default function(options: NxKarmaToJestSchematicSchema): Rule {
  return (host: Tree, context: SchematicContext) => {
    return runNxKarmaToJest(host, context);
  };
}
