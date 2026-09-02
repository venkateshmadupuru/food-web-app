export const FREE_DELIVERY_THRESHOLD_IN_PAISE = 49900;
export const DELIVERY_FEE_IN_PAISE = 4000;
export const PACKAGING_CHARGE_PER_ITEM_IN_PAISE = 300;
export const PLATFORM_FEE_IN_PAISE = 900;

export const GST_RATE = 0.05;
export const OTHER_TAX_RATE = 0.01;

export const calculateTotalItems = (cartItems) => {
  return cartItems.reduce((sum, item) => {
    return sum + (item.quantity || 1);
  }, 0);
};

export const calculateTotalAmount = (cartItems) => {
  return cartItems.reduce((sum, item) => {
    const info = item.card.info;
    const price = info.price ?? info.defaultPrice ?? 0;
    const quantity = item.quantity || 1;

    return sum + price * quantity;
  }, 0);
};

export const calculateBillDetails = (cartItems) => {
  const totalItems = calculateTotalItems(cartItems);
  const totalAmount = calculateTotalAmount(cartItems);

  const isFreeDeliveryEligible =
    totalAmount >= FREE_DELIVERY_THRESHOLD_IN_PAISE;

  const deliveryFeeInPaise = isFreeDeliveryEligible
    ? 0
    : DELIVERY_FEE_IN_PAISE;

  const packagingChargeInPaise =
    totalItems * PACKAGING_CHARGE_PER_ITEM_IN_PAISE;

  const taxableAmountInPaise =
    totalAmount + packagingChargeInPaise;

  const gstAmountInPaise = Math.round(
    taxableAmountInPaise * GST_RATE
  );

  const otherTaxAmountInPaise = Math.round(
    taxableAmountInPaise * OTHER_TAX_RATE
  );

  const totalPayableInPaise =
    totalAmount +
    deliveryFeeInPaise +
    packagingChargeInPaise +
    PLATFORM_FEE_IN_PAISE +
    gstAmountInPaise +
    otherTaxAmountInPaise;

  return {
    totalItems,
    totalAmount,
    deliveryFeeInPaise,
    packagingChargeInPaise,
    platformFeeInPaise: PLATFORM_FEE_IN_PAISE,
    gstAmountInPaise,
    otherTaxAmountInPaise,
    totalPayableInPaise,
  };
};

export const formatCurrency = (amountInPaise) => {
  return `Rs. ${(amountInPaise / 100).toFixed(2)}`;
};