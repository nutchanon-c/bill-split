import { useState } from "react";

export const AddPerson = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const onTextChange = (e) => {
    console.log(e.target.id);
    switch (e.target.id) {
      case "price":
        setPrice(parseFloat(e.target.value));
        break;
      case "name":
        setName(e.target.value);
        break;
      default:
        break;
    }
  };
  const handleSubmit = () => {
    if (name) {
      let item = { name: name, price: price };
      props.onAddItem(item);
      setName("");
      setPrice(0);
    }
  };
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex flex-row items-center">
        <div className="w-12">
          <label htmlFor="name">Name:</label>
        </div>
        <input
          type="text"
          className="px-5 py-2"
          onChange={onTextChange}
          value={name}
          id="name"
          placeholder={"Name"}
        />
      </div>
      <div className="flex flex-row items-center">
        <div className="w-12">
          <label htmlFor="price">Price: </label>
        </div>
        <input
          type="number"
          className="px-5 py-2"
          onChange={onTextChange}
          value={price}
          id="price"
          placeholder={"Price"}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="border-white border-2 rounded-lg"
      >
        Add Item
      </button>
    </div>
  );
};
