// react router dom
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// react icons
import { FcStackOfPhotos } from "react-icons/fc";
import { FaHeart } from "react-icons/fa6";
import { FaSun, FaMoon, FaDownload } from "react-icons/fa";

// components
import { NavLinks } from "./";
import { useGlobalContext } from "../hooks/useGlobalContext";

// firebase
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";

const themeFromLocalStorage = () => {
  return localStorage.getItem("theme") || "winter";
};

function Navbar() {
  const { likedImages, downloadImages, user, dispatch } = useGlobalContext();
  const [theme, setTheme] = useState(themeFromLocalStorage());
  const toggleTheme = () => {
    const newTheme = theme == "winter" ? "dracula" : "winter";
    setTheme(newTheme);
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      dispatch({ type: "LOGOUT" });
      toast.success("See you soon!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <header className="bg-base-200">
      <div className="navbar align-elements">
        <div className="navbar-start">
          <Link to="/" className="hidden md:flex">
            <FcStackOfPhotos className="w-10 h-10" />
          </Link>

          <div className="dropdown md:hidden">
            <div tabIndex={0} role="button" className="m-1 btn">
              <FcStackOfPhotos className="w-10 h-10" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <NavLinks />
            </ul>
          </div>
        </div>
        <div className="hidden navbar-center md:flex">
          <ul className="gap-3 menu menu-horizontal rounded-box">
            <NavLinks />
          </ul>
        </div>
        <div className="flex items-center gap-6 navbar-end">
          <Link to="/likedImages">
            <div className="indicator">
              <span className="indicator-item badge badge-sm badge-secondary">
                {likedImages.length}
              </span>
              <FaHeart className="w-6 h-6" />
            </div>
          </Link>
          <Link to="/downloadImages">
            <div className="indicator">
              <span className="indicator-item badge badge-sm badge-secondary">
                {downloadImages.length}
              </span>
              <FaDownload className="w-6 h-6" />
            </div>
          </Link>
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" onClick={toggleTheme} />

            {/* sun icon */}
            <FaSun className="w-6 h-6 fill-current swap-off" />

            {/* moon icon */}
            <FaMoon className="w-6 h-6 fill-current swap-on" />
          </label>
          <div className="flex items-center gap-3">
            <p>{user.displayName && user.displayName.split(" ")[0]}</p>
            <div className=" dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  {user.photoURL && (
                    <img
                      src={user.photoURL}
                      alt={user.displayName + "avatar"}
                    />
                  )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <button onClick={signOutUser}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
