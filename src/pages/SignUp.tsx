import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/signUp.scss";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { auth } from "../firebase.config";
import Button from "../components/Button/Button";

function SignUp() {
  interface formDataType {
    name: string;
    email: string;
    password: string;
  }
  const [formData, setFormData] = useState<formDataType>({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { name, email, password } = formData;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const register = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(user, {
        displayName: name,
      });

      const formDataForDB = {
        name: formData.name,
        email: formData.email,
        timestamp: serverTimestamp(),
      };

      await setDoc(doc(db, "users", user.uid), formDataForDB);

      navigate("/");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div className="sign-up-container">
      <header>
        <p>Join Us!</p>
      </header>
      <form className="form" onSubmit={register}>
        <input
          type="text"
          placeholder="John Doe"
          id="name"
          value={name}
          onChange={onChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          value={email}
          onChange={onChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={onChange}
        />
        <Button children={"Register"} />
      </form>
      <NavLink to="/signin">Sign In Instead</NavLink>
    </div>
  );
}

export default SignUp;
