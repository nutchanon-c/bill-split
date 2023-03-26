export const NextButton = (props) => {
  return (
    <button
      onClick={props.onPressed}
      className="bg-blue-50 text-black w-20 h-10 rounded-lg"
    >
      {"Next >"}
    </button>
  );
};
