import { formatCurrency } from "../../utils/cartUtils";

const BillDetails = ({ billDetails }) => {
  const {
    totalAmount,
    deliveryFeeInPaise,
    packagingChargeInPaise,
    platformFeeInPaise,
    gstAmountInPaise,
    otherTaxAmountInPaise,
    totalPayableInPaise,
  } = billDetails;

  return (
    <div className="mt-4 rounded-lg bg-gray-100 p-4 text-left shadow-md dark:bg-gray-900">
      <h3 className="mb-3 text-xl font-bold text-orange-500">Bill Details</h3>

      <div className="flex items-center justify-between gap-4 py-1 text-sm text-gray-700 dark:text-gray-200 sm:text-base">
        <span>Item Subtotal</span>
        <span>{formatCurrency(totalAmount)}</span>
      </div>
      <div className="flex items-center justify-between gap-4 py-1 text-sm text-gray-700 dark:text-gray-200 sm:text-base">
        <span>Delivery Fee</span>
        <span>
          {deliveryFeeInPaise === 0
            ? "FREE"
            : formatCurrency(deliveryFeeInPaise)}
        </span>
      </div>
      <div className="flex items-center justify-between gap-4 py-1 text-sm text-gray-700 dark:text-gray-200 sm:text-base">
        <span>Packaging Charges</span>
        <span>{formatCurrency(packagingChargeInPaise)}</span>
      </div>
      <div className="flex items-center justify-between gap-4 py-1 text-sm text-gray-700 dark:text-gray-200 sm:text-base">
        <span>Platform Fee</span>
        <span>{formatCurrency(platformFeeInPaise)}</span>
      </div>
      <div className="flex items-center justify-between gap-4 py-1 text-sm text-gray-700 dark:text-gray-200 sm:text-base">
        <span>GST (5%)</span>
        <span>{formatCurrency(gstAmountInPaise)}</span>
      </div>
      <div className="flex items-center justify-between gap-4 py-1 text-sm text-gray-700 dark:text-gray-200 sm:text-base">
        <span>Other Taxes (1%)</span>
        <span>{formatCurrency(otherTaxAmountInPaise)}</span>
      </div>
      <div className="mt-3 flex items-center justify-between gap-4 border-t border-gray-300 pt-3 text-lg font-bold text-orange-500 dark:border-gray-700">
        <span>Total Payable</span>
        <span>{formatCurrency(totalPayableInPaise)}</span>
      </div>
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        Delivery is free on orders above Rs. 499.
      </p>
    </div>
  );
};

export default BillDetails;
