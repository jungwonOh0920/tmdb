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
import Button, { ButtonSizes } from "../components/Button/Button";
import TmdbInput, { InputTypes } from '../components/FormElements/TmdbInput'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FirebaseError } from "firebase/app";

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
      if (error instanceof FirebaseError) {
        showToastErrMessage(error.message)
      }
      console.log("error: ", error);
    }
  }

  const showToastErrMessage = (error: string) => {
    toast.error(error, {
      theme: 'dark',
      position: toast.POSITION.TOP_RIGHT
    })
  }

  return (
    <div className="sign-up-container">
      <h1>Join Us!</h1>
      <form className="sign-up-form" onSubmit={register}>
        <TmdbInput
          label='name'
          type={InputTypes.text}
          onChange={onChange}
          placeholder='Jay Oh'
          id='name'
        />
        <TmdbInput
          label='E-mail'
          type={InputTypes.email}
          onChange={onChange}
          placeholder='JayIsAwesome@gmail.com'
          id='email'
        />
        <TmdbInput
          label='Password'
          type={InputTypes.password}
          onChange={onChange}
          placeholder='123123'
          id='password'
        />
        <Button children={"Register"} size={ButtonSizes.small} />
      </form>
      <NavLink to="/signin">Sign In Instead</NavLink>
      <ToastContainer />
    </div>
  );
}

export default SignUp;
