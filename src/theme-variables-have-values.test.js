const fs = require('fs');
const glob = require('glob');
const path = require('path');

describe('theme variables', () => {
  ['orion-fusion-theme', 'clinical-lowlight-theme'].forEach((theme) => {
    it('values are populated', () => {
      const CUSTOM_PROPERTY_REGEX = new RegExp('--terra-[a-z]+([a-z0-9-]+[a-z0-9]+)?', 'g');

      // The set of variables that have been assigned a value for the theme.
      const themedVariables = [];

      // The set of variables available for the themed packages.
      const availableVariables = [];

      // Aggregate all variables from the themed theme files.
      glob.sync(path.join('**', 'themes', theme, `${theme}.scss`).forEach((fileName) => {
        console.log(fileName);
        const file = fs.readFileSync(fileName, { encoding: 'UTF-8' });
        themedVariables.push(...new Set(file.match(CUSTOM_PROPERTY_REGEX) || []));
      }));

      // All scss files.
      glob.sync(path.join('src', '**', '*.scss'), { ignore: path.join('src', 'terra-dev-site', '**', '*.scss') }).forEach((fileName) => {
        const file = fs.readFileSync(fileName, { encoding: 'UTF-8' });
        availableVariables.push(...new Set(file.match(CUSTOM_PROPERTY_REGEX) || []));
      });

      const diff = availableVariables.filter(x => !themedVariables.includes(x));

      expect(diff).toBe([]);
    });
  });
});

