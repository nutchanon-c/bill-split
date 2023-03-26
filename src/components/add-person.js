import { useState } from "react";
export const AddPersonForm = (props) => {
  const [name, setName] = useState("");
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (name) {
      props.addPerson(name);
      setName("");
    }
  };

  const handleOnChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="flex flex-row">
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          placeholder="Name"
          className="px-5 py-2"
          value={name}
          onChange={handleOnChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
