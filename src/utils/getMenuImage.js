export const getMenuImage = (item) => {
  if (!item || !item.id || !item.category) return "/images/menu/default.jpg";

  // Make category folder safe (convert to lowercase, remove special chars, replace spaces with hyphens)
  const category = item.category
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  // Image filename is the id from JSON
  const filename = `${item.id}.jpg`;

  return `/images/menu/${category}/${filename}`;
};
