// firebase imports
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// react imports
import { useEffect } from "react";

export const useCollection = (collectionName) => {
  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, collectionName));
      console.log(querySnapshot);
      // querySnapshot.forEach((doc) => {
      //   console.log(doc.id, " => ", doc.data());
      // });
    };

    getData();
  }, []);

  return;
};
