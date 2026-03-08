import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/posts/hu/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title - Cím' } }),
        excerpt: fields.text({ 
          label: 'Excerpt - Bevezető', 
          multiline: true,
          description: 'Ez jelenik meg a listaoldalakon.' 
        }),
        content: fields.markdoc({ label: 'Content - Tartalom' }),
      },
    }),
  },
});