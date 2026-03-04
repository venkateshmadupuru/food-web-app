import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../../utils/cartslice";
import { getMenuImage } from "../../utils/getMenuImage";
import toast from "react-hot-toast";

const Itemslist = ({ items, isCart = false }) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    toast.success("Added to cart");
    dispatch(addItem(item));
  };
  const handleremoveItem = (item) => {
    dispatch(removeItem(item.card.info.id));
  };
  const getItemPrice = (info) => {
    const priceInPaise = info.price ?? info.defaultPrice ?? 0;
    return (priceInPaise / 100).toFixed(2);
  };
  return (
    <div className="dark:bg-gray-800 dark:text-white rounded-lg bg-gray-100">
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="p-2 m-2 border-gray-500 border-b-2 text-left flex flex-col lg:flex-row justify-between gap-3 items-start lg:items-center"
        >
          <div className="lg:w-8/12 md:top-0 w-full mt-4 order-2 lg:order-1">
            <div className="py-2 font-bold flex justify-between gap-2 flex-wrap">
              <span>{item.card.info.name}</span>
              <span>
                - Rs.
                {getItemPrice(item.card.info)}
              </span>
            </div>
            <p className="text-md">{item.card.info.description}</p>
          </div>
          <div className="lg:w-4/12 w-full p-4 relative order-1 lg:order-2">
            <div className="flex justify-center items-center gap-3 mt-2 mb-3">
              <button
                className="bg-green-500 text-white px-3 text-xl mx-1 sm:mx-3 my-1 rounded-lg"
                onClick={() => handleAddItem(item)}
              >
                +
              </button>
              <p className="text-lg font-semibold bg-gray-700 px-3 rounded-full text-white">
                {item.quantity || 1}
              </p>
              {isCart && (
                <button
                  className="bg-red-500 text-white px-3 text-xl mx-1 sm:mx-3 my-1 rounded-lg"
                  onClick={() => handleremoveItem(item)}
                >
                  -
                </button>
              )}
            </div>
            <img
              src={getMenuImage(item.card.info)}
              onError={(e) => {
                e.currentTarget.src = "/images/menu/default.jpg";
              }}
              className="md:w-full w-full max-w-[220px] mx-auto rounded-lg"
              alt={item.card.info.name}
              loading="lazy"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Itemslist;

