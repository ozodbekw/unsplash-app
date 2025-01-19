// globalcontext
import { useGlobalContext } from "../hooks/useGlobalContext";

// firebase
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

// toaster
import { toast } from "react-toastify";

// react hooks
import { useState } from "react";

function Profile() {
  const [imageBase64, setImageBase64] = useState(null);

  const senrVerification = () => {
    sendEmailVerification(auth.currentUser, {
      url: "https://unsplash-app.vercel.app/profile",
    }).then(() => {
      toast.success("Verification is sent");
    });
  };

  const { user, loading } = useGlobalContext();

  const imageChangeBase64 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (file.size % 1024 < 1024) {
      reader.addEventListener("load", () => {
        setImageBase64(reader.result);
      });

      reader.readAsDataURL(file);
    } else {
      toast.warn("Image must be less than 1 mb");
    }
  };

  const saveImageSaving = () => {
    setImageBase64(null);
  };

  return (
    <div className="py-10 align-elements">
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="flex flex-col justify-center">
          <figure className="relative">
            {loading && (
              <span className="absolute inline-block w-40 h-40 mx-auto bg-black rounded-full ml-9 bg-opacity-30">
                <span className="absolute loading loading-ring loading-lg left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"></span>
              </span>
            )}

            <img
              src={imageBase64 ?? user.photoURL}
              className="w-40 h-40 mx-auto mb-5 rounded-full md:w-40 md:h-40"
              alt={user.displayName + "avatar"}
            />
          </figure>
          {!imageBase64 && (
            <input
              onChange={imageChangeBase64}
              type="file"
              accept=".jg,.jpeg,.png,.gif"
              className="mx-auto max-w-96 file-input-xs file-input file-input-bordered file-input-primary"
            />
          )}

          {imageBase64 && (
            <div className="flex justify-center gap-1">
              <button
                onClick={saveImageSaving}
                className="btn grow btn-secondary btn-xs"
              >
                Cencel
              </button>
              <button className="btn grow btn-primary btn-xs">Save</button>
            </div>
          )}
        </div>
        <div className="grid gap-5 p-5 rounded-lg md:grid-cols-2 bg-base-200 grow">
          <h2>
            <span className="block font-medium">Display Name:</span>
            <span>{user.displayName}</span>
          </h2>
          <h2>
            <span className="block font-medium"> Status:</span>
            <span>
              {user.emailVerified ? (
                "Verified ✅"
              ) : (
                <span className="flex items-center gap-2">
                  <span>Not Verified</span>
                  <button
                    onClick={senrVerification}
                    className="btn btn-xs btn-primary"
                  >
                    Send
                  </button>
                </span>
              )}
            </span>
          </h2>
          <h2>
            <span className="block font-medium"> Email:</span>
            <span>{user.email}</span>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Profile;
