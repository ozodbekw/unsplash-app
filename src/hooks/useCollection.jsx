// firebase imports
import {
  collection,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// react imports
import { useEffect, useState } from "react";

export const useCollection = (collectionName) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const q = query(collection(db, collectionName), where("", "==", "CA"));
    onSnapshot(q, (querySnapshot) => {
      const queryData = [];
      querySnapshot.forEach((doc) => {
        queryData.push({ _id: doc.id, ...doc.data() });
      });
      setData(queryData);
    });
  }, []);

  return { data };
};

// ---------------------------8:36---------------------------
