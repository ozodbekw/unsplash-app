// firebase imports
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// react imports
import { useEffect, useState } from "react";

export const useCollection = (collectionName) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const queryData = [];
      // console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        queryData.push({ id: doc.id, ...doc.data() });
      });
      setData(queryData);
    };
    getData();
  }, []);

  return { data };
};
