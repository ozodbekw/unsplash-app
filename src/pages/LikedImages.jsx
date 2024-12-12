// global context
import { useGlobalContext } from "../hooks/useGlobalContext";

// components
import { ImagesContainer } from "../components";
import { Link } from "react-router-dom";

function LikedImages() {
  const { likedImages } = useGlobalContext();

  if (likedImages.length === 0) {
    return (
      <div className="h-full flex flex-col justify-center items-center gap-10 ">
        <h1 className="text-center  text-4xl">
          You don't choose any images yet!
        </h1>
        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="align-elements">
      {likedImages.length > 0 && <ImagesContainer images={likedImages} />}
    </div>
  );
}

export default LikedImages;
