import todo_icon from "../assets/todo_icon.png";
import TodoItems from "./TodoItems";
import { useEffect, useRef, useState } from "react";

const Todo = () => {
  const inputRef = useRef();

  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );

  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") {
      return null;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };
    setTodoList((prev) => [...prev, newTodo]);

    inputRef.current.value = "";
  };

  const deleteTodo = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };

  const toggle = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isComplete: !todo.isComplete,
          };
        }
        return todo;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="bg-white place-self-center md:w-[50%] w-full h-full flex flex-col p-7 md:min-h-[550px] rounded-xl">
      {/* ------title----- */}
      <div className="flex items-center  mt-7 gap-2">
        <img className="w-8" src={todo_icon} alt="" />
        <h1 className="tect-3xl font-semibold">To-do list</h1>
      </div>

      {/* ------input box----- */}
      <div className="flex  md:item-center md:flex-row justify-between gap-2 item-center flex-col my-7 md:bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          className="md:bg-transparent rounded-full bg-gray-200 border-0 outline-none md:flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="Add your task"
        />
        <button
          onClick={add}
          className="border-none rounded-full bg-purple-600 h-14 min-w-20 md:min-w-32 text-white text-lg font-medium cursor-pointer"
        >
          Add +
        </button>
      </div>

      {/* ------to list----- */}

      <div>
        {todoList.map((item, index) => {
          return (
            <TodoItems
              key={index}
              text={item.text}
              id={item.id}
              isComplete={item.isComplete}
              deleteTodo={deleteTodo}
              toggle={toggle}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
