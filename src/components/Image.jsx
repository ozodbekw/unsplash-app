// global constext
import { useGlobalContext } from "../hooks/useGlobalContext";

// react icons
import { FaHeart, FaRegHeart, FaDownload } from "react-icons/fa";

// react router dom
import { Link } from "react-router-dom";

// useFirestore hook
import { useFirestore } from "../hooks/useFirestore";

function Image({ image, added }) {
  const { likedImages, dispatch } = useGlobalContext();

  const { addDocument, deleteDocument } = useFirestore();

  const { links, urls, alt_describtion, user } = image;

  const addLikedImage = (image, event) => {
    event.preventDefault();
    const alreadyAdded = likedImages.some((img) => {
      return img.id == image.id;
    });

    if (!alreadyAdded) {
      addDocument("likedImages", image.id, image);
    } else {
      deleteDocument("likedImages", image.id, image);
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
            className="absolute bg-white heart-icon"
          >
            <FaHeart className="text-red-600" />
          </span>
        )}
        <img
          src={urls.regular}
          alt={alt_describtion}
          className="w-full rounded-md"
        />
        <span className="absolute flex items-center gap-2 left-2 bottom-2 hover-icons">
          <img
            src={user.profile_image.large}
            alt={user.name + " avatar"}
            className="w-5 h-5 rounded-full md:w-8 md:h-8"
          />
          <p className="text-xs text-white md:text-sm">{user.name}</p>
        </span>
        <span className="absolute flex items-center justify-center text-white rounded-full cursor-pointer h-7 w-7 right-2 bottom-2 hover-icons">
          <span onClick={downloadImage}>
            <FaDownload className="text-white" />
          </span>
        </span>
      </div>
    </Link>
  );
}

export default Image;
