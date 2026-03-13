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
    coverImage: fields.image({
      label: lang === 'hu' ? 'Borítókép' : (lang === 'en' ? 'Cover Image' : 'Titelbild'),
      // 1. Ez mondja meg, hova mentse a fájlt fizikailag
      directory: `src/content/posts/${lang}/`, 
      // 2. Ez mondja meg, mi legyen a fájlban (relatív útvonal!)
      publicPath: './', 
      validation: { isRequired: false },
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
      path: "src/content/pages/hu/rolunk/", 
      format: { contentField: "content" },
      schema: {
        title: fields.text({ label: "Cím" }),
        description: fields.text({ label: "Meta description", multiline: true }), // Új mező
        hrefLang: fields.text({ 
          label: 'Fordítások slug-jai', 
          description: 'Vesszővel elválasztva. EN-slug, DE-slug.',
          validation: { isRequired: false }
        }),
        content: fields.markdoc({ label: "Tartalom" }),
      },
    }),
    page_en_rolunk: singleton({
      label: "About us (EN)",
      path: "src/content/pages/en/about-us/", 
      format: { contentField: "content" },
      schema: {
        title: fields.text({ label: "Cím" }),
        description: fields.text({ label: "Meta description", multiline: true }), // Új mező
        hrefLang: fields.text({ 
          label: 'Fordítások slug-jai', 
          description: 'Vesszővel elválasztva. HU-slug, DE-slug.',
          validation: { isRequired: false }
        }),
        content: fields.markdoc({ label: "Tartalom" }),
      },
    }),
    page_de_rolunk: singleton({
      label: "Über uns (DE)",
      path: "src/content/pages/de/uber-uns/", 
      format: { contentField: "content" },
      schema: {
        title: fields.text({ label: "Cím" }),
        description: fields.text({ label: "Meta description", multiline: true }), // Új mező
        hrefLang: fields.text({ 
          label: 'Fordítások slug-jai', 
          description: 'Vesszővel elválasztva. HU-slug, EN-slug.',
          validation: { isRequired: false }
        }),
        content: fields.markdoc({ label: "Tartalom" }),
      },
    }),
  },
});