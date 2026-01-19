export const getMenuImage = (menuInfo) => {
  if (!menuInfo?.id || !menuInfo?.category) {
    return "/images/menu/default.jpg";
  }
  const category = menuInfo.category
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  return `/images/menu/${category}/${menuInfo.id}.jpg`;
};
