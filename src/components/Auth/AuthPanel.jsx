import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeAuth } from "../../utils/authSlice";
import Login from "./Login";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const AuthPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { open, intent } = useSelector((s) => s.auth);

  const onClose = useCallback(() => {
    dispatch(closeAuth());
  }, [dispatch]);

  const handleSuccess = useCallback(() => {
    dispatch(closeAuth());

    if (intent === "cart") {
      navigate("/cart");
    }
  }, [dispatch, intent, navigate]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [open, onClose]);

  if (!open) return null;

  const title = intent === "cart" ? "Sign in to view your cart" : "Welcome";

  return (
    <div className="fixed inset-0 z-50 flex justify-end" data-testid="auth-panel">
      <div
        className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative h-full w-full max-w-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-2xl border-l border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <IoClose className="text-xl" />
          </button>
        </div>
        <Login onSuccess={handleSuccess} />
     </div>
    </div>
  );
}
export default AuthPanel;
