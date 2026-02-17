import { useDispatch, useSelector } from "react-redux";
import { openAuth } from "../../utils/authSlice";
import { useEffect } from "react";
const ProtectedRoute = ({ children }) => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(openAuth({ intent: "cart" }));
    }
  }, [user, dispatch]);

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[50vh] text-orange-500 dark:text-gray-200 text-2xl font-extrabold">
        Please sign in to access your cart
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
