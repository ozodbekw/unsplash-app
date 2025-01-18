// globalcontext
import { useGlobalContext } from "../hooks/useGlobalContext";

// firebase
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

// toaster
import { toast } from "react-toastify";

function Profile() {
  const senrVerification = () => {
    sendEmailVerification(auth.currentUser, {
      url: "https://unsplash-app.vercel.app/profile",
    }).then(() => {
      toast.success("Verification is sent");
    });
  };

  const { user } = useGlobalContext();
  console.log(user);
  return (
    <div className="py-10 align-elements">
      <div className="flex gap-5">
        <div>
          <img
            src={user.photoURL}
            className="w-40 h-40 rounded-full"
            alt={user.displayName + "avatar"}
          />
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
