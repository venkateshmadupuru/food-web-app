import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../../utils/userSlice";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribe = () => {};
    let mounted = true;

    const initAuth = async () => {
      await import("../../utils/firebase");
      const authModule = await import("firebase/auth");
      const auth = authModule.getAuth();

      unsubscribe = authModule.onAuthStateChanged(auth, (user) => {
        if (!mounted) return;

        if (user) {
          const { uid, email, displayName, photoURL } = user;
          dispatch(addUser({ uid, email, displayName, photoURL }));
        } else {
          dispatch(removeUser());
        }
        setLoading(false);
      });
    };

    initAuth();

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [dispatch]);

  if (loading) {
    return null;
  }
  return <>{children}</>;
};

export default AuthProvider;
