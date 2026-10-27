/**
 * Shiki transformer that swaps light-theme token colours for darker ones.
 *
 * `min-light` uses a few colours that fall just below WCAG AA (4.5:1) on the
 * code block surface (#f6f7f9). Only the `--shiki-light` value is replaced,
 * so the dark theme is untouched.
 *
 * @param {Record<string, string>} replacements - Map of original to replacement colours (uppercase hex)
 */
export const transformerLightContrast = (replacements = {}) => ({
  span(node) {
    const style = node.properties.style;
    if (typeof style !== "string") return;

    node.properties.style = style.replace(
      /--shiki-light:(#[0-9A-Fa-f]{6})/,
      (match, color) => {
        const replacement = replacements[color.toUpperCase()];
        return replacement ? `--shiki-light:${replacement}` : match;
      }
    );
  },
});
