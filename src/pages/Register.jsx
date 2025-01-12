// register hooks
import { useRegister } from "../hooks/useRegister";

// react icons
import { HiLockClosed } from "react-icons/hi";
import { FcPicture } from "react-icons/fc";
import { FcGoogle } from "react-icons/fc";

// router-dom
import { Link, useActionData, Form } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

// action
export const action = async ({ request }) => {
  const form = await request.formData();
  const displayName = form.get("displayName");
  const email = form.get("email");
  const password = form.get("password");
  const confirmPassword = form.get("confirmPassword");

  if (password == confirmPassword) {
    return {
      displayName,
      email,
      password,
    };
  } else {
    toast.warn("Password does not equal!");
    return null;
  }
};

function Register() {
  const inputData = useActionData();
  const { registerWithGoogle, registerWithEmail } = useRegister();
  useEffect(() => {
    if (inputData) {
      registerWithEmail(
        inputData.displayName,
        inputData.email,
        inputData.password
      );
    }
  }, [inputData]);

  return (
    <div className="flex items-center ">
      <div className="flex items-center w-[50vw] justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <FcPicture className="mx-auto h-[200px] w-auto" />
            <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
              Register
            </h2>
            <p className="mt-2 text-sm text-center text-gray-600">
              Or{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Login
              </Link>
            </p>
          </div>
          <Form className="mt-8 space-y-6 " action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="flex flex-col gap-4 -space-y-px rounded-md shadow-sm">
              <div className="">
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
              <div className="mb-5">
                <label htmlFor="displayName" className="sr-only">
                  Name
                </label>
                <input
                  id="displayName"
                  name="displayName"
                  type="text"
                  autoComplete="name"
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Your name"
                />
              </div>
              <div className="mb-5">
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
              <div>
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
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
                Register
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
          </Form>
        </div>
      </div>
      <div className="fixed top-0 bottom-0 left-0 bg-black bg-opacity-30 md:hidden"></div>
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

export default Register;
