// global constext
import { useGlobalContext } from "../hooks/useGlobalContext";

// react icons
import { FaHeart, FaRegHeart, FaDownload } from "react-icons/fa";

// react router dom
import { Link } from "react-router-dom";

function Image({ image, added }) {
  const { likedImages, dispatch } = useGlobalContext();

  const { links, urls, alt_describtion, user } = image;

  const addLikedImage = (image, event) => {
    event.preventDefault();
    const alreadyAdded = likedImages.some((img) => {
      return img.id == image.id;
    });

    if (!alreadyAdded) {
      dispatch({ type: "LIKE", payload: image });
    } else {
      dispatch({ type: "UNLIKE", payload: image.id });
    }
  };

  const downloadImage = (event) => {
    event.preventDefault();
    window.open(links.download + "&force=true", "_blank");
  };

  return (
    <Link to="/imageInfo">
      <div className="relative group" style={{ width: "100%" }}>
        {!added && (
          <span
            onClick={(event) => addLikedImage(image, event)}
            className="absolute heart-icon"
          >
            <FaRegHeart className="text-white" />
          </span>
        )}
        {added && (
          <span
            onClick={(event) => addLikedImage(image, event)}
            className="absolute heart-icon bg-white"
          >
            <FaHeart className="text-red-600" />
          </span>
        )}
        <img
          src={urls.regular}
          alt={alt_describtion}
          className="w-full rounded-md"
        />
        <span className="absolute left-2 bottom-2 flex gap-2 items-center hover-icons">
          <img
            src={user.profile_image.large}
            alt={user.name + " avatar"}
            className="w-5 md:w-8 h-5 md:h-8 rounded-full"
          />
          <p className="text-white text-xs md:text-sm">{user.name}</p>
        </span>
        <span className="absolute h-7 w-7 rounded-full flex justify-center items-center cursor-pointer right-2 bottom-2 hover-icons text-white">
          <span onClick={downloadImage}>
            <FaDownload className="text-white" />
          </span>
        </span>
      </div>
    </Link>
  );
}

export default Image;
