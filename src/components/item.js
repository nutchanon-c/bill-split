export const Item = (props) => {
  return (
    <div className="flex flex-row justify-end items-center">
      <div className="flex flex-row justify-between items-center h-12 p-2 my-3 w-full">
        <p className="w-36">{props.item.name}</p>
        <p>{props.item.price}</p>
      </div>
      <div className="flex w-6 h-6 justify-center items-center rounded-lg ml-4 border-2 border-red-500 text-red-500">
        <button
          onClick={() => {
            props.handleRemoveItem(props.index);
          }}
        >
          x
        </button>
      </div>
    </div>
  );
};
