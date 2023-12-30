import { useState, useEffect, useContext } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import FirebaseContext from "../context/firebase";

export default function useAuthListener() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  const { firebase } = useContext(FirebaseContext);

  if (firebase === undefined) {
    console.log('firebase is undefined');
  } else {
    console.log('firebase is defined', firebase);
  }

  console.log('firebase instance:', firebase);
  const auth = getAuth(firebase);
  console.log('auth object:', auth);
  useEffect(() => {
    console.log('useEffect running');
    const listener = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        console.log("User logged in:", authUser);
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setUser(authUser);
      } else {
        console.log("User logged out");
        localStorage.removeItem("authUser");
        setUser(null);
      }
    });

    return () => {
      listener();
    };
  }, [auth]);

  return { user };
}