import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCq0203zwxbEMUJTXdGlGnb9B59QKjrhK0",
  authDomain: "my-splash-8137f.firebaseapp.com",
  projectId: "my-splash-8137f",
  storageBucket: "my-splash-8137f.firebasestorage.app",
  messagingSenderId: "1055260867137",
  appId: "1:1055260867137:web:692e4f53b62cbb5e6024c0",
};

const app = initializeApp(firebaseConfig);

// auth
export const auth = getAuth();
