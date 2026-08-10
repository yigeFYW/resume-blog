/* global hexo */
'use strict';

// Compiles theme SCSS through dart-sass. Registered as a Hexo renderer so
// `source/css/style.scss` becomes `css/style.css` during `hexo generate`.
// Partials (`_*.scss`) are skipped by Hexo's own asset pipeline.

const path = require('path');

let sass = null;
let sassError = null;

try {
  sass = require('sass');
} catch (err) {
  sassError = err;
}

function renderScss(data, options) {
  if (!sass) {
    hexo.log.error(
      '[wulitou-resume] "sass" is not installed. Run `npm install` inside themes/wulitou-resume.'
    );
    throw sassError;
  }

  const filePath = data.path;
  const includePaths = [];

  if (filePath) includePaths.push(path.dirname(filePath));
  includePaths.push(path.join(hexo.theme_dir, 'source/css'));

  const result = sass.compileString(data.text, {
    syntax: 'scss',
    style: 'compressed',
    loadPaths: includePaths,
    url: filePath ? require('url').pathToFileURL(filePath) : undefined,
    quietDeps: true,
    silenceDeprecations: ['import', 'global-builtin', 'color-functions'],
    logger: {
      warn(message, opts) {
        if (opts && opts.deprecation) return;
        hexo.log.warn('[wulitou-resume][sass] ' + message);
      }
    }
  });

  return result.css.toString();
}

renderScss.disableNunjucks = true;

hexo.extend.renderer.register('scss', 'css', renderScss);
hexo.extend.renderer.register('sass', 'css', renderScss);
