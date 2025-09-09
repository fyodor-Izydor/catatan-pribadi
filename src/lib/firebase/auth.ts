// src/lib/firebase/auth.ts

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from  "../firebase";

const auth = getAuth(app);

export const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};
