import { config, fields, collection, singleton } from '@keystatic/core';

const postCollection = (lang: 'hu' | 'en' | 'de', label: string) => collection({
  label: `Posts - ${label}`,
  slugField: 'title',
  // A mappa stratégia lényege a végén lévő /
  path: `src/content/posts/${lang}/*/`, 
  format: { contentField: 'content' },
  schema: {
    title: fields.slug({ 
      name: { 
        label: lang === 'hu' ? 'Cím' : (lang === 'en' ? 'Title' : 'Titel') 
      } 
    }),
    excerpt: fields.text({ 
      label: lang === 'hu' ? 'Bevezető' : (lang === 'en' ? 'Excerpt' : 'Auszug'), 
      multiline: true,
      description: 'Ez jelenik meg a listaoldalakon.' 
    }),
    content: fields.markdoc({ 
      label: lang === 'hu' ? 'Tartalom' : (lang === 'en' ? 'Content' : 'Inhalt') 
    }),
  },
});


export default config({
  storage: {
    kind: "local",
  },
  collections: {
    posts_hu: postCollection("hu", "Magyar"),
    posts_en: postCollection("en", "English"),
    posts_de: postCollection("de", "Deutsch"),
  },
  singletons: {
    page_hu_rolunk: singleton({
      label: "Rólunk (HU)",
      path: "src/content/pages/hu/about/", 
      format: { contentField: "content" },
      schema: {
        title: fields.text({ label: "Cím" }),
        content: fields.markdoc({ label: "Tartalom" }),
      },
    }),
  },
});