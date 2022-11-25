import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-up-form.style.scss";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("password not match ");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log({ displayName }, "from sign up component");
      await createUserDocumentFromAuth(user, { displayName });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("error accrued when creation the user ", error);
      }
    }
  };
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2> Don't have an account </h2>
      <span> Sign up with your email and password </span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          onChange={handleFormChange}
          type="text"
          required
          name="displayName"
          value={displayName}
        />
        <FormInput
          label="email"
          onChange={handleFormChange}
          type="email"
          required
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          onChange={handleFormChange}
          type="password"
          name="password"
          value={password}
          required
        />
        <FormInput
          label="Confirm Password"
          onChange={handleFormChange}
          type="password"
          required
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button buttonType="" type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
