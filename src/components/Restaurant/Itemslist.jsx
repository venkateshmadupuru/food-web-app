import { memo } from "react";
import ItemCard from "./ItemCard";

const ItemsList = ({ items, isCart = false }) => {
  return (
    <div className="rounded-lg bg-white dark:bg-gray-800 dark:bg-transparent dark:text-white">
      {items.map((item) => (
        <ItemCard
          key={item.card.info.id}
          item={item}
          isCart={isCart}
        />
      ))}
    </div>
  );
};

export default memo(ItemsList);