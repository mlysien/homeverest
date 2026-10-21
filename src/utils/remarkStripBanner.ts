import type { Root } from "mdast";

/**
 * Removes the leading `![banner](...)` image from a post body.
 * The banner is rendered as the post hero instead (see utils/posts.ts).
 */
export function remarkStripBanner() {
  return (tree: Root) => {
    const index = tree.children.findIndex(node => node.type !== "yaml");
    const first = tree.children[index];
    if (
      first?.type === "paragraph" &&
      first.children.length === 1 &&
      first.children[0].type === "image" &&
      first.children[0].alt === "banner"
    ) {
      tree.children.splice(index, 1);
    }
  };
}
