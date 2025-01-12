// firebase imports
import { auth } from "../firebase/firebaseConfig";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

// toaster
import { toast } from "react-toastify";

// global context
import { useGlobalContext } from "./useGlobalContext";

export const useRegister = () => {
  const { dispatch } = useGlobalContext();
  const registerWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log(result);
        dispatch({ type: "LOGIN", payload: user });
        toast.success("Welcome");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  const registerWithEmail = (displayName, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await updateProfile(auth.currentUser, {
          displayName: displayName,
          photoURL: `https://api.dicebear.com/9.x/initials/svg?seed=${displayName}`,
        });
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        toast.success(`Welcome ${user.displayName}`);
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  return { registerWithEmail, registerWithGoogle };
};
