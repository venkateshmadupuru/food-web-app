import React from "react";
import { ShoppingCartIcon } from "@heroicons/react/16/solid";

const CartIcon = ({ count = 0 }) => {
  return (
    <div className="relative flex items-center space-x-1">
      <ShoppingCartIcon className="h-7 w-7" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-green-600 text-white 
        text-xs font-bold px-1.5 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
