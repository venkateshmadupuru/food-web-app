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

  const isFreeDeliveryEligible = totalAmount >= 49900;
  const deliveryFeeInPaise = isFreeDeliveryEligible ? 0 : 4000;
  const packagingChargeInPaise = totalItems * 300;
  const platformFeeInPaise = 900;

  const gstRate = 0.05;
  const otherTaxRate = 0.01;
  const taxableAmountInPaise = totalAmount + packagingChargeInPaise;

  const gstAmountInPaise = Math.round(taxableAmountInPaise * gstRate);
  const otherTaxAmountInPaise = Math.round(taxableAmountInPaise * otherTaxRate);

  const totalPayableInPaise =
    totalAmount +
    deliveryFeeInPaise +
    packagingChargeInPaise +
    platformFeeInPaise +
    gstAmountInPaise +
    otherTaxAmountInPaise;

  const formatCurrency = (amountInPaise) => {
    return `Rs. ${(amountInPaise / 100).toFixed(2)}`;
  };

  return (
    <div className="w-[95%] sm:w-11/12 md:w-9/12 lg:w-6/12 m-auto p-4 text-center dark:text-white min-h-screen font-serif">
      {orderPlaced && (
        <>
          <div className="text-green-500 text-2xl font-semibold mt-4">
            Order placed Successfully!
          </div>
        </>
      )}
      {cartItems.length === 0 && !orderPlaced && (
        <div className="flex flex-col justify-center items-center mt-20 sm:mt-32">
          <MdRemoveShoppingCart className="text-6xl text-orange-400 mb-3" />
          <h1 className="text-xl md:text-2xl font-semibold text-orange-500 text-center">
            Your cart is empty
          </h1>
          <p className="text-lg text-gray-500 font-semibold mt-1 dark:text-gray-300">
            Let&apos;s fill it with something delicious
          </p>
        </div>
      )}
      {cartItems.length > 0 && (
        <>
          <button
            className="bg-orange-600 font-semibold text-white px-3 py-2 rounded-md m-4 
            transform hover:scale-105 transition-transform duration-300 w-full sm:w-auto"
            onClick={handleClearcart}
          >
            Clear Cart
          </button>
          <Itemslist items={cartItems} isCart={true} />
          <div className="flex flex-col sm:flex-row sm:justify-between text-orange-500 gap-1 text-left">
            <h2 className="text-lg font-semibold">Total Items: {totalItems}</h2>
            <h2 className="text-lg font-semibold">
              Subtotal: {formatCurrency(totalAmount)}
            </h2>
          </div>

          <div className="mt-4 p-4 rounded-lg bg-gray-100 dark:bg-gray-900 text-left shadow-md">
            <h3 className="text-xl font-bold text-orange-500 mb-3">Bill Details</h3>

            <div className="flex justify-between py-1 text-gray-700 dark:text-gray-200 items-center gap-4 text-sm sm:text-base">
              <span>Item Subtotal</span>
              <span>{formatCurrency(totalAmount)}</span>
            </div>
            <div className="flex justify-between py-1 text-gray-700 dark:text-gray-200 items-center gap-4 text-sm sm:text-base">
              <span>Delivery Fee</span>
              <span>
                {deliveryFeeInPaise === 0 ? "FREE" : formatCurrency(deliveryFeeInPaise)}
              </span>
            </div>
            <div className="flex justify-between py-1 text-gray-700 dark:text-gray-200 items-center gap-4 text-sm sm:text-base">
              <span>Packaging Charges</span>
              <span>{formatCurrency(packagingChargeInPaise)}</span>
            </div>
            <div className="flex justify-between py-1 text-gray-700 dark:text-gray-200 items-center gap-4 text-sm sm:text-base">
              <span>Platform Fee</span>
              <span>{formatCurrency(platformFeeInPaise)}</span>
            </div>
            <div className="flex justify-between py-1 text-gray-700 dark:text-gray-200 items-center gap-4 text-sm sm:text-base">
              <span>GST (5%)</span>
              <span>{formatCurrency(gstAmountInPaise)}</span>
            </div>
            <div className="flex justify-between py-1 text-gray-700 dark:text-gray-200 items-center gap-4 text-sm sm:text-base">
              <span>Other Taxes (1%)</span>
              <span>{formatCurrency(otherTaxAmountInPaise)}</span>
            </div>
            <div className="border-t border-gray-300 dark:border-gray-700 mt-3 pt-3 flex justify-between text-lg font-bold text-orange-500 items-center gap-4">
              <span>Total Payable</span>
              <span>{formatCurrency(totalPayableInPaise)}</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Delivery is free on orders above Rs. 499.
            </p>
          </div>

          <button
            className="text-xl text-orange-400 font-bold px-4 py-2 
            bg-gradient-to-br from-gray-700 to-gray-600 transform 
            hover:scale-110 transition-all duration-300 rounded-full mt-6 w-full sm:w-auto"
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
