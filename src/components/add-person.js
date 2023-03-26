import { useState } from "react";
export const AddPersonForm = (props) => {
  const [name, setName] = useState("");
  const handleOnSubmit = (e) => {
    e.preventDefault();

    const res = props.addPerson(name);
    if (res) {
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
        <button
          type="submit"
          className="border-2 border-white rounded-lg px-4 py-1 ml-2"
        >
          Add
        </button>
      </form>
    </div>
  );
};
