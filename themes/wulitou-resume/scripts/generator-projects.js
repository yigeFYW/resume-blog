/* global hexo */
'use strict';

// Generates the standalone "all projects" list page at
// `theme_options.projects_page_path` (default `projects/`). It is produced by
// the theme rather than by a site markdown file so a user gets the page for
// free after filling in `projects`.

hexo.extend.generator.register('wulitou_projects', function () {
  const resume = hexo.extend.helper.get('wulitou_resume').call(this);
  const options = resume.options;

  if (options.projects_page === false) return [];
  if (!resume.projects.items.length) return [];

  const path = String(options.projects_page_path || '').replace(/^\/+/, '');
  if (!path) return [];

  return [
    {
      // Directory paths need an index file to be servable as a static site.
      path: /\/$/.test(path) ? path + 'index.html' : path,
      layout: ['projects'],
      data: {
        title: resume.projects.listTitle,
        description: resume.seo.description,
        // Flags the page for the sidebar/nav so "项目作品" stays highlighted.
        wr_projects_page: true
      }
    }
  ];
});
