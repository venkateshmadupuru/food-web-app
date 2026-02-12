import {  useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeAuth } from "../../utils/authUiSlice";
import Login from "./Login";

const AuthPanel = () => {
  const dispatch = useDispatch();
  const { open, intent } = useSelector((s) => s.authUi);

  const onClose = useCallback(() => {
    dispatch(closeAuth());
  }, [dispatch]);

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

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-black/95 text-white p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Welcome</h2>
          <button onClick={onClose} className="text-2xl font-bold">
            ✕
          </button>
        </div>

        <Login isDrawer intent={intent} onClose={onClose} />
      </div>
    </div>
  );
};

export default AuthPanel;
