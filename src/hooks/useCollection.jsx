// firebase imports
import { collection, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// react imports
import { useEffect, useState } from "react";

export const useCollection = (collectionName) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    onSnapshot(collection(db, collectionName), (querySnapshot) => {
      const queryData = [];
      querySnapshot.forEach((doc) => {
        queryData.push({ id: doc.id, ...doc.data() });
      });
      setData(queryData);
    });
  }, []);

  return { data };
};
