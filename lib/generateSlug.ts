export function generateSlug(title: string, withPrefix = true) {
  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  // Ideal-matrix style short id (crypto safe)
  const id = crypto.randomUUID().split('-')[0]; // 8 chars, collision-safe

  return withPrefix ? `${baseSlug}-${id}` : baseSlug;
}
