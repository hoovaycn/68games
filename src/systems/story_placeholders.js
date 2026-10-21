export function replaceStoryNames(text, names) {
  if (typeof text !== 'string') return text;
  return text.replace(/\{(MC_NAME|ALLY_1_NAME|ALLY_2_NAME)\}/g,
    (placeholder, key) => names[key] ?? placeholder);
}
