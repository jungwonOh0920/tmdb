import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Button from "../Button/Button";
import "./signIn.scss";
import TmdbInput, { InputTypes } from "../FormElements/TmdbInput";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      }
    });
  }


  const signIn = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sign-in-container">
      <h1 className='text-3xl'>Welcome Back! <span>&#128075;</span></h1>
      <form onSubmit={signIn}>
        <TmdbInput
          label='Email'
          type={InputTypes.email}
          placeholder='ex) test1@gmail.com'
          onChange={onChange}
          id='email'
        />
        <TmdbInput
          label='password'
          type={InputTypes.password}
          placeholder='ex) 123123'
          onChange={onChange}
          id='password'
        />
        <div className="form-buttons-container">
          <Button children={"Sign In"} />
          <Button linkTo="/signup">Register Instead</Button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
