import { createContext, useEffect, useReducer } from "react";

export const GlobalContext = createContext();

// const dataFromLocalStorage = () => {
//   try {
//     return (
//       JSON.parse(localStorage.getItem("my-splash-data")) || {
//         likedImages: [],
//         downloadImages: [],
//       }
//     );
//   } catch (error) {
//     console.error("Error parsing localStorage data:", error);
//     return { likedImages: [] };
//   }
// };

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
    case "LIKE":
      if (!state.likedImages.some((image) => image.id === payload.id)) {
        return {
          ...state,
          likedImages: [...state.likedImages, payload],
        };
      }
      return state;
    case "UNLIKE":
      return {
        ...state,
        likedImages: state.likedImages.filter((image) => image.id !== payload),
      };
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

  useEffect(() => {
    localStorage.setItem("my-splash-data", JSON.stringify(state));
  }, [state]);

  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
