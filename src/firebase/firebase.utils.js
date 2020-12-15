import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAlASFEVTy-IrQ7-K97VMmugQ9eibA2GMU",
  authDomain: "ecommerce-db-68d8a.firebaseapp.com",
  projectId: "ecommerce-db-68d8a",
  storageBucket: "ecommerce-db-68d8a.appspot.com",
  messagingSenderId: "785828928567",
  appId: "1:785828928567:web:1ddc9ea247c524648573b2",
  measurementId: "G-7BPZWQN0PQ",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("ERROR: creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
