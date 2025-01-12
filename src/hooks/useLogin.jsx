// firebase imports
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

// global contex
import { useGlobalContext } from "./useGlobalContext";

// toaster
import { toast } from "react-toastify";

export function useLogin() {
  const { dispatch } = useGlobalContext();
  const loginWithEmail = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        toast.success(`Welcome ${user.displayName}`);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        toast.error("Email or Password is incorrect!");
      });
  };
  return { loginWithEmail };
}
