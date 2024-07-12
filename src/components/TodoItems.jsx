import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";
import delete_icon from "../assets/delete.png";

// eslint-disable-next-line react/prop-types
function TodoItems({ text, id, isComplete, toggle, deleteTodo }) {
  return (
    <div className="flex item-center justify-between px-4 my-3 gap-2">
      <div
        onClick={() => {
          toggle(id);
        }}
        className=" flex flex-1 items-center  cursor-pointer"
      >
        <img src={isComplete ? tick : not_tick} alt="" className="w-7 " />
        <p
          className={`text-slate-700 ml-4 text-[17px] text-nowrap  ${
            isComplete ? "line-through" : " "
          }`}
        >
          {text}
        </p>
      </div>
      <img
        src={delete_icon}
        className="w-4 h-4 cursor-pointer"
        onClick={() => {
          deleteTodo(id);
        }}
        alt={text}
      />
    </div>
  );
}

export default TodoItems;
