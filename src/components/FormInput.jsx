// react icons
import { FaSearch } from "react-icons/fa";

function FormInput({ type, placeHolder, name }) {
  return (
    <label className="input input-bordered flex items-center gap-2 w-full input-sm md:input-md">
      <input
        type={type}
        className="grow"
        placeholder={placeHolder}
        name={name}
      />
      <FaSearch className="h-4 w-4 opacity-70" />
    </label>
  );
}

export default FormInput;
