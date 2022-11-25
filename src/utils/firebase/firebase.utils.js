import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { Await } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyDP7hg05kEtZZBuJiXkIHM4fRnOufvL1rg",
  authDomain: "crown-clothing-72322.firebaseapp.com",
  projectId: "crown-clothing-72322",
  storageBucket: "crown-clothing-72322.appspot.com",
  messagingSenderId: "314377058863",
  appId: "1:314377058863:web:8e125ac12606a1a17924da",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalData = {}
) => {
  console.log(additionalData, "from utils");

  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  return userDocRef;
};
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
