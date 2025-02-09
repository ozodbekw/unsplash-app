// import firebase
import { doc, deleteDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// toaster
import { toast } from "react-toastify";

export const useFirestore = () => {
  const addDocument = (collectionName, data) => {
    addDoc(collection(db, collectionName), data)
      .then(() => {
        toast.success("You liked this image ❤️");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const deleteDocument = (collectionName, id, data) => {
    deleteDoc(doc(db, collectionName, id), data)
      .then(() => {
        toast.success("You deleted this image 🗑️");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return { addDocument, deleteDocument };
};
