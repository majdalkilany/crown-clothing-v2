import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import SignUp from "../../components/sign-up-form/sign-up-form.component";
import Button from "../../components/button/button.component";
const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    console.log();
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  return (
    <div>
      <Button buttonType="google" onClick={logGoogleUser}>
        Sign-In With Google
      </Button>
      <SignUp />

      <h1> Sign-In page </h1>
    </div>
  );
};

export default SignIn;
