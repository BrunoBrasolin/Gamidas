import { Rule, SchematicContext, Tree, apply, branchAndMerge, mergeWith, template, url, move } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';

// Entry point for the schematic
export function newPage(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    if (!_options.name) {
      throw new Error('The "name" option is required.');
    }
    const nameDasherized = strings.dasherize(_options.name);
    const templateSource = apply(url('./files'), [
      template({
        ..._options,
        ...strings,
      }),
      move(`src/app/pages/${nameDasherized}`)
    ]);
    return branchAndMerge(mergeWith(templateSource))(tree, _context);
  };
}
