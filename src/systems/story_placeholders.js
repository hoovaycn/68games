export function replaceStoryNames(text, names) {
  if (typeof text !== 'string') return text;
  return text.replace(/\{([A-Za-z0-9_]+)\}/g, (placeholder, key) => names[key] ?? placeholder);
}
