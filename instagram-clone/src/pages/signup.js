/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import {
  getFirestore,
  collection,
  add,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import "firebase/compat/auth";
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import ".//login.css";
import { doesUsernameExist } from "../services/firebase";
import { getAuth } from "firebase/auth";
import { getIdToken } from "firebase/compat/auth";

export default function SignUp() {
  const Navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);
  const db = getFirestore(firebase);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";

  const handleSignUp = async (event) => {
    event.preventDefault();

    const usernameExists = await doesUsernameExist(username);
    const userRef = doc(collection(getFirestore(firebase), "users"), username);
    const userDocSnap = await getDoc(userRef);

    if (!usernameExists) {
      // Username doesn't exist, proceed with user creation
      // ...
      try {
        const createdUser = await createUserWithEmailAndPassword(
          getAuth(),
          emailAddress,
          password
        );

        const {user} = createdUser;
        await updateProfile(user, { displayName: username });
        const userRef = doc(
          collection(getFirestore(firebase), "users"),
          user.uid
        );
        await setDoc(userRef, {
          username: username.toLowerCase(),
          fullName,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          dateCreated: Date.now(),
        });

        Navigate("/");
      } catch (error) {
        // Handle error
        setError(error.message);
        setFullName("");
        setEmailAddress("");
        setPassword("");
      }
    } else {
      // Username already exists, handle error
      setError("Username already taken!");
    }
  };

  useEffect(() => {
    document.title = "SignUp-instagram";
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img
          src="/images/iphone-with-profile.jpg"
          alt="iPhone with Instagram app"
        />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="Instagram"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleSignUp} method="POST">
            <input
              aria-label="Enter your Username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />
            <input
              aria-label="Enter your Full name"
              type="text"
              placeholder="Full name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setFullName(target.value)}
              value={fullName}
            />
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold
            ${isInvalid && "opacity-50"}`}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
          <p className="text-sm">
            Already have an account?{""}
            <Link to="/login" className="font-bold text-blue-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
