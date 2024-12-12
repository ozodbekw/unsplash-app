// components
import { Search, ImagesContainer } from "../components";

// react router dom
import { useActionData } from "react-router-dom";

// action
export const action = async ({ request }) => {
  let formData = await request.formData();
  let search = formData.get("search");
  return search;
};

// custom hook
import { useFetch } from "../hooks/useFetch";
import { useState, useEffect, useRef } from "react";
import { SiArchicad } from "react-icons/si";

function Home() {
  const searchParamsFromAction = useActionData();
  const [allImages, setAllImages] = useState([]);
  const [pageParam, setPageParam] = useState(1);

  const prevSearchParam = useRef(searchParamsFromAction);

  const { data, isPending, error } = useFetch(
    `https://api.unsplash.com/search/photos?client_id=${
      import.meta.env.VITE_ACCES_KEY
    }&query=${searchParamsFromAction ?? "all"}&page=${pageParam}`
  );

  useEffect(() => {
    if (data && data.results) {
      setAllImages((prevImages) => {
        return pageParam === 1
          ? data.results
          : [...prevImages, ...data.results];
      });
    }
  }, [data]);

  useEffect(() => {
    if (searchParamsFromAction !== prevSearchParam.current) {
      setAllImages([]);
      setPageParam(1);
      prevSearchParam.current = searchParamsFromAction;
    }
  }, [searchParamsFromAction]);

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <div className="align-elements">
      <div className="my-10">
        <Search />
      </div>
      {isPending && "Loading"}
      {allImages.length > 0 && <ImagesContainer images={allImages} />}
      <div className="my-10">
        <button
          onClick={() => setPageParam(pageParam + 1)}
          className="btn btn-secondary btn-block"
        >
          Read More
        </button>
      </div>
    </div>
  );
}

export default Home;
