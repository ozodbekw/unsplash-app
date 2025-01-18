// components
import FormInput from "./FormInput";

// react router dom
import { Form, useActionData } from "react-router-dom";

// firebase
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

// hooks
import { useEffect } from "react";

// toaster
import { toast } from "react-toastify";

function Mdal() {
  const data = useActionData();
  useEffect(() => {
    if (data?.emailForReset) {
      sendPasswordResetEmail(auth, data.emailForReset)
        .then(() => {
          toast.success("Seccesful send");
          document.getElementById("my_modal_1").close();
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error(errorMessage);
        });
    }
  }, [data]);
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="mb-4 text-lg font-bold">Reset password!</h3>
        <Form method="post">
          <FormInput type="email" placeholder="email" name="email_for_reset" />
          <div className="modal-action">
            <button
              onClick={() => document.getElementById("my_modal_1").close()}
              type="button"
              className="btn"
            >
              Close
            </button>
            <button className="btn btn-primary">Send</button>
          </div>
        </Form>
      </div>
    </dialog>
  );
}

export default Mdal;
