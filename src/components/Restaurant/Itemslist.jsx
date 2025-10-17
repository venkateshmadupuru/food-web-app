import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../../utils/cartslice";
import { CDN_URL } from "../../utils/constants";

const Itemslist = ({ items, isCart = false }) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };
  const handleremoveItem = (item) => {
    dispatch(removeItem(item.card.info.id));
  };
  return (
    <div className="dark:bg-gray-800 dark:text-white rounded-lg bg-gray-100">
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="p-2 m-2 border-gray-500 border-b-2 text-left flex flex-col lg:flex-row justify-between"
        >
          <div className="lg:w-8/12 md:top-0 w-full mt-4 order-2 lg:order-1">
            <div className="py-2 font-bold">
              <span>{item.card.info.name}</span>
              <span>
                - ₹
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </span>
            </div>
            <p className="text-md">{item.card.info.description}</p>
          </div>
          <div className="lg:w-4/12 w-full p-4 relative order-1 lg:order-2">
            <div className="absolute flex justify-center items-center space-x-9">
              <button
                className="bg-green-500 text-white px-3 text-xl mx-3 my-1 rounded-lg"
                onClick={() => handleAddItem(item)}
              >
                +
              </button>
              <p className="text-lg font-semibold bg-gray-700 px-3 rounded-full text-white">
                {item.quantity || 1}
              </p>
              {isCart && (
                <button
                  className="bg-red-500 text-white px-3 text-xl mx-40 my-1 rounded-lg"
                  onClick={() => handleremoveItem(item)}
                >
                  -
                </button>
              )}
            </div>
            <img
              src={CDN_URL + item.card.info.imageId}
              className="md:w-full w-52 rounded-lg"
              alt="restaurantimage"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Itemslist;
