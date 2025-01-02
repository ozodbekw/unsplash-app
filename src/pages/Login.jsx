import { HiLockClosed } from "react-icons/hi";
import { FcPicture } from "react-icons/fc";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

// custom hooks
import { useRegister } from "../hooks/useRegister";

function Login() {
  const { registerWithGoogle } = useRegister();
  return (
    <div className="flex items-center ">
      <div className="flex items-center w-[50vw] justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <FcPicture className="mx-auto h-[200px] w-auto" />
            <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
              Login
            </h2>
            <p className="mt-2 text-sm text-center text-gray-600">
              Or{" "}
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Register
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div className="mb-5">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label
                  htmlFor="remember-me"
                  className="block ml-2 text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div className="flex gap-5">
              <button
                type="submit"
                className="md:btn-dm btn-sm relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#F7CA45] border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <HiLockClosed
                    className="w-5 h-5 text-[#F7CA45] group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Login
              </button>
              <button
                onClick={registerWithGoogle}
                type="button"
                className="md:btn-dm btn-sm relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#E94235] border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span>Google</span>
                <FcGoogle className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="">
        <img
          className="object-fill w-full h-screen sm:px-6 lg:px-8"
          src="https://www.quadrifoglio.com/wp-content/uploads/2022/04/Reception-Glass-per-hospitality-hotel-bar-campus-negozi-aereoporti-e-collitivita-10.jpg"
          alt=""
        />
      </div>
    </div>
  );
}

export default Login;
