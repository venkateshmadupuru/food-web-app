import { useDispatch, useSelector } from "react-redux";
import ItemsList from "../Restaurant/ItemsList";
import BillDetails from "./BillDetails";
import ConfirmModal from "./ConfirmModal";
import { clearCart } from "../../utils/cartslice";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdDeleteOutline, MdRemoveShoppingCart } from "react-icons/md";
import { calculateBillDetails, formatCurrency } from "../../utils/cartUtils";

const Cart = () => {
  const [confirmation, setConfirmation] = useState(null);
  const dispatch = useDispatch();

  const closeConfirmation = () => setConfirmation(null);

  const handleOrderConfirm = () => {
    dispatch(clearCart());
    toast.success("Order placed successfully!");
    closeConfirmation();
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    closeConfirmation();
  };

  const cartItems = useSelector((store) => store.cart.items);

  const billDetails = calculateBillDetails(cartItems);
  const { totalItems, totalAmount } = billDetails;

  return (
    <>
      <div className="m-auto min-h-screen w-[95%] p-4 text-center font-serif dark:text-white sm:w-11/12 md:w-9/12 lg:w-6/12">
      {cartItems.length === 0 && (
        <div className="flex flex-col justify-center items-center mt-20 sm:mt-32">
          <MdRemoveShoppingCart className="text-6xl text-orange-400 mb-3" />
          <h1 className="text-xl md:text-2xl font-semibold text-orange-500 text-center">
            Your cart is empty
          </h1>
          <p className="text-lg text-gray-500 font-semibold mt-1 dark:text-gray-300">
            Let's fill it with something delicious
          </p>
        </div>
      )}
      {cartItems.length > 0 && (
        <>
          <button
            type="button"
            className="m-4 inline-flex w-full items-center justify-center gap-2 rounded-md border border-red-200 bg-white px-3 py-2 font-semibold text-red-600 transition-colors duration-300 hover:border-red-300 hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 sm:w-auto dark:border-red-500/40 dark:bg-gray-800 dark:text-red-300 dark:hover:bg-red-500/10"
            onClick={() => setConfirmation("clear")}
          >
            <MdDeleteOutline className="h-5 w-5" aria-hidden="true" />
            Clear Cart
          </button>
          <ItemsList items={cartItems} isCart={true} />
          <div className="flex flex-col sm:flex-row sm:justify-between text-orange-500 gap-1 text-left">
            <h2 className="text-lg font-semibold">Total Items: {totalItems}</h2>
            <h2 className="text-lg font-semibold">
              Subtotal: {formatCurrency(totalAmount)}
            </h2>
          </div>

          <BillDetails billDetails={billDetails} />

          <button
            type="button"
            className="mt-6 w-full rounded-md bg-orange-600 px-4 py-2 text-xl font-bold text-white transition-colors duration-300 hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 sm:w-auto dark:bg-orange-500 dark:hover:bg-orange-600"
            onClick={() => setConfirmation("order")}
          >
            Order Now
          </button>
        </>
      )}
      </div>
      <ConfirmModal
        isOpen={confirmation === "clear"}
        title="Clear your cart?"
        message="All items will be removed from your cart."
        confirmLabel="Clear Cart"
        tone="danger"
        onConfirm={handleClearCart}
        onCancel={closeConfirmation}
      />
      <ConfirmModal
        isOpen={confirmation === "order"}
        title="Place your order?"
        message={`Your order total is ${formatCurrency(
          billDetails.totalPayableInPaise,
        )}.`}
        confirmLabel="Place Order"
        onConfirm={handleOrderConfirm}
        onCancel={closeConfirmation}
      />
    </>
  );
};

export default Cart;