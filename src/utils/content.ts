import { type CollectionEntry, render } from "astro:content";
import { type experimental_AstroContainer } from "astro/container";

const Utils = {
  stripExtension(id: string) {
    let result = id.replace(/\.[^/.]+$/, "");
    return result;
  },

  async makeExcerptsOnIndex(
    posts: CollectionEntry<"posts">[],
    container: experimental_AstroContainer,
    lang: string,
    collection: string
  ) {
    return await Promise.all(
      posts.map(async (post) => {
        let finalExcerpt = "";
        let liveId = "";
        liveId = this.stripExtension(post.id)
        if (liveId.indexOf('/') > 0) {
          // Ha a bal oldal undefined, az üres stringet kapja meg
          liveId = liveId.split('/').at(-2) ?? ''; 
          liveId = `${lang}/${collection}/${liveId}`; 
        }

        finalExcerpt = await this.singlePostExcerpt(post, container)
        return { ...post, finalExcerpt, liveId };
      }),
    );
  },
  async singlePostExcerpt(
    post: CollectionEntry<"posts">,
    container: experimental_AstroContainer,
){

    const excerptField = post.data.excerpt?.trim() || "";

    if (excerptField.length > 0) {
      return excerptField;
    } else if (post.body.includes("<!--more-->")) {
      return post.body.split("<!--more-->")[0];
    } else {
      // Itt használjuk a már létező containert
      const { Content } = await render(post);
      const html = await container.renderToString(Content);

      return html
        .replace(/<[^>]*>?/gm, "") // HTML tagek eltávolítása
        .replace(/\s+/g, " ") // Minden fehér karakter (szóköz, újsor) normalizálása
        .trim()
        .split(" ")
        .slice(0, 25) // Egy kicsit több szó talán jobban mutat
        .join(" ")
        .concat("...");
    }


  }
};
export default Utils;
