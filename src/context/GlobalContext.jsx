import { createContext, useEffect, useReducer } from "react";
import { useCollection } from "../hooks/useCollection";

export const GlobalContext = createContext();

const changeState = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN":
      return {
        ...state,
        user: payload,
      };
    case "AUTH_READY":
      return {
        ...state,
        authReady: true,
      };
    case "ADD_LIKEDIMAGES":
      if (!state.likedImages.some((image) => image.id === payload.id)) {
        return {
          ...state,
          likedImages: payload,
        };
      }
      return state;
    default:
      return state;
  }
};

export function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(changeState, {
    user: null,
    authReady: false,
    likedImages: [],
    downloadImages: [],
  });

  const { data: likedImages } = useCollection("likedImages", [
    "uid",
    "==",
    state.user && state.user.uid,
  ]);

  useEffect(() => {
    localStorage.setItem("my-splash-data", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (likedImages)
      dispatch({ type: "ADD_LIKEDIMAGES", payload: likedImages });

    return;
  }, [likedImages]);

  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
