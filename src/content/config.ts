import { defineCollection, z } from 'astro:content';

// 1. Definiáljuk a bejegyzések (posts) sémáját
const postsCollection = defineCollection({
  // Mivel a Keystatic Markdoc-ot használ (.mdoc), ezt adjuk meg típusnak
  type: 'content', 
  schema: z.object({
    title: z.string(),
    // Itt adhatsz hozzá további mezőket, amiket a Keystatic-ban is definiáltál
    // pl. publishDate: z.date().optional(),
    excerpt: z.string().optional().default('')
  }),
});

// 2. Exportáljuk a gyűjteményeket az Astro számára
export const collections = {
  'posts': postsCollection,
};