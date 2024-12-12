// react-router-dom
import { Link } from "react-router-dom";

function DownloadImages() {
  return (
    <div className="h-full flex flex-col justify-center items-center gap-10 ">
      <h1 className="text-center text-2xl md:text-4xl">
        You don't choose any images yet!
      </h1>
      <Link to="/" className="btn btn-primary btn-sm md:btn-md">
        Go Home
      </Link>
    </div>
  );
}

export default DownloadImages;
