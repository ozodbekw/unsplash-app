// components
import { Form } from "react-router-dom";
import { FormInput } from "./";

function Search() {
  return (
    <Form method="post" className="max-w-96 w-full mx-auto flex gap-2">
      <FormInput type="text" placeHolder="Search" name="search" />
      <button className="btn btn-primary md:hidden btn-sm">Search</button>
    </Form>
  );
}

export default Search;
