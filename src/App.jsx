// react-router-dom
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

//pages
import {
  Home,
  About,
  Contact,
  LikedImages,
  DownloadImages,
  ImageInfo,
  Login,
  Register,
} from "./pages";

// Layouts
import MainLayout from "./layouts/MainLayout";

// actions
import { action as HomeAction } from "./pages/Home";
import { action as RegisterAction } from "./pages/Register";

// components
import { ProtectedRoutes } from "./components";

// global context
import { useGlobalContext } from "./hooks/useGlobalContext";

// firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { useEffect } from "react";
import { toast } from "react-toastify";

function App() {
  const { user, dispatch, authReady } = useGlobalContext();
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />,
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
          action: HomeAction,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/likedImages",
          element: <LikedImages />,
        },
        {
          path: "/downloadImages",
          element: <DownloadImages />,
        },
        {
          path: "/imageInfo",
          element: <ImageInfo />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
      action: RegisterAction,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch({ type: "LOGIN", payload: user });
      dispatch({ type: "AUTH_READY" });
    });
  }, []);

  return <>{authReady && <RouterProvider router={routes} />}</>;
}

export default App;
