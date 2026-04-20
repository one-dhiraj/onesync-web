import {
  GoogleAuthProvider, signInWithPopup, signOut, signInWithEmailAndPassword,
  createUserWithEmailAndPassword,EmailAuthProvider, linkWithCredential,
  updatePassword
} from "firebase/auth";
import { auth } from "../firebase";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  return await signInWithPopup(auth, provider);
};

export const logout = async () => {
  await signOut(auth);
};

export const loginWithEmail = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signupWithEmail = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const linkPassword = async (email, password) => {
  const user = auth.currentUser;

  const credential = EmailAuthProvider.credential(email, password);

  return await linkWithCredential(user, credential);
};

export const hasPasswordProvider = (user) => {
  return user.providerData.some(
    (provider) => provider.providerId === "password"
  );
};

export const updateUserPassword = async (newPassword) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not logged in");
  }

  return await updatePassword(user, newPassword);
};