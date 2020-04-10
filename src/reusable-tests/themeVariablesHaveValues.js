const fs = require('fs');
const glob = require('glob');
const path = require('path');

const themeVariablesHaveValues = (baseDir, themes) => {
  describe('theme variables', () => {
    themes.forEach((theme) => {
      it(`all ${theme} values are populated`, () => {
        const CUSTOM_PROPERTY_REGEX = new RegExp('--terra-[a-z]+([a-z0-9-]+[a-z0-9]+)?', 'g');

        // The set of variables that have been assigned a value for the theme.
        const themedVariables = [];

        // The set of variables available for the themed packages.
        const availableVariables = [];

        // Aggregate all variables from the themed theme files.
        glob.sync(path.join(baseDir, 'themes', theme, `${theme}.scss`)).forEach((fileName) => {
          const file = fs.readFileSync(fileName, { encoding: 'UTF-8' });
          themedVariables.push(...new Set(file.match(CUSTOM_PROPERTY_REGEX) || []));
        });

        // All scss files.
        glob.sync(path.join(baseDir, 'src', '**', '*.scss'), { ignore: path.join(baseDir, 'src', 'terra-dev-site', '**', '*.scss') }).forEach((fileName) => {
          const file = fs.readFileSync(fileName, { encoding: 'UTF-8' });
          availableVariables.push(...new Set(file.match(CUSTOM_PROPERTY_REGEX) || []));
        });

        const diff = availableVariables.filter(x => !themedVariables.includes(x));

        expect(diff).toEqual([]);
      });
    });
  });
};

export default themeVariablesHaveValues;
