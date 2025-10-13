import { useDispatch, useSelector } from "react-redux";
import Itemslist from "../Restaurant/Itemslist";
import { clearCart } from "../../utils/cartslice";
import { useState } from "react";
import { MdRemoveShoppingCart } from "react-icons/md";

const Cart = () => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const dispatch = useDispatch();

  const handleOrderNow = () => {
    setOrderPlaced(true);
    dispatch(clearCart());
    setTimeout(() => {
      setOrderPlaced(false);
    }, 3000);
  };

  const handleClearcart = () => {
    dispatch(clearCart());
    setOrderPlaced(false);
  };
  const cartItems = useSelector((store) => store.cart.items);

  const totalItems = cartItems.reduce((sum, item) => {
    return sum + (item.quantity || 1);
  }, 0);

  const totalAmount = cartItems.reduce((sum, item) => {
    const info = item.card.info;
    const price = info.price ?? info.defaultPrice ?? 0;
    const quantity = item.quantity || 1;
    return sum + price * quantity;
  }, 0);

  return (
    <div className="w-6/12 m-auto p-4 text-center dark:text-white min-h-screen font-serif">

      {orderPlaced && (
        <>
          <div className="text-green-500 text-2xl font-semibold mt-4">
            Order placed Successfully!
          </div>
        </>
      )}
      {cartItems.length === 0 && !orderPlaced && (
        <div className="flex flex-col justify-center items-center mt-32">
          <MdRemoveShoppingCart className="text-6xl text-orange-400 mb-3" />
          <h1 className="text-xl md:text-2xl font-semibold text-orange-500 text-center">
            Your cart is empty
          </h1>
          <p className="text-lg text-gray-500 font-semibold mt-1 dark:text-gray-300">
            Let’s fill it with something delicious
          </p>
        </div>
      )}
      {cartItems.length > 0 && (
        <>
          <button
            className="bg-orange-600 font-semibold text-white px-3 py-2 rounded-md m-4 
            transform hover:scale-105 transition-transform duration-300"
            onClick={handleClearcart}
          >
            Clear Cart
          </button>
          <Itemslist items={cartItems} isCart={true} />
          <div className="flex justify-between text-orange-500">
            <h2 className="text-lg font-semibold">Total Items: {totalItems}</h2>
            <h2 className="text-lg font-semibold">
              Total Amount: ₹ {(totalAmount / 100).toFixed(2)}
            </h2>
          </div>

          <button
            className="text-xl text-orange-400 font-bold px-4 py-2 
            bg-gradient-to-br from-gray-700 to-gray-600 transform 
            hover:scale-110 transition-all duration-300 rounded-full mt-6"
            onClick={handleOrderNow}
          >
            Order Now
          </button>
        </>
      )}
    </div>
  );
};
export default Cart;
