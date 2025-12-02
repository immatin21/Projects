import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import Navbar from "./components/Navbar";
function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [ShowFinished, SetShowFinished] = useState(false);

  const ToggleFinished = () => {
    SetShowFinished(!ShowFinished);
  };

  useEffect(() => {
    let todoString = localStorage.getItem("todos");

    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    console.log(t);
    setTodo(t[0].todo);

    let newTodo = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodo);
  };
  const handleDelete = (e, id) => {
    let newTodo = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodo);
  };

  const handleSave = () => {
    if (todo.length >= 3) {
      setTodos([...todos, { id: uuidv4(), todo, isComplete: false }]);
      setTodo("");
    } else if (todo.length < 3) {
      setTodo("It must contain 3 characters or more");
    }
    setTimeout(() => {
      setTodo("");
    }, 3000);
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleCheckbox = (e) => {
    let id = e.target.name;

    let index = todos.findIndex((item) => {
      return item.id === id;
    });

    let newTodo = [...todos];
    newTodo[index].isComplete = !newTodo[index].isComplete;
    setTodos(newTodo);
  };

  return (
    <>
      <Navbar />

      <div className="container mx-auto my-8 w-[85vw] md:w-[40vw] bg-cyan-200 p-4 rounded-2xl flex flex-col min-h-[70vh]">
        <div className="head font-bold text-3xl flex justify-center pt-2 pb-6">
          <h1>iTask - Manage your todos at one place</h1>
        </div>
        <div className="add-to-do">
          <h2 className="font-bold text-xl">Add Tasks</h2>
          <div className="input flex gap-3 my-3">
            <input
              onChange={handleChange}
              value={todo}
              className="bg-white rounded-2xl w-full md:w-[35vw] outline-none px-3"
              type="text"
            />
            <button
              onClick={handleSave}
              className="bg-gray-500 py-1 rounded-3xl px-3 text-white cursor-pointer hover:bg-gray-600"
              type="submit"
            >
              Save
            </button>
          </div>
        </div>

        <div className="bg-gray-400 w-full md:w-[30vw] my-5 h-0.5 md:mx-20"></div>

        <div className="finishedTasks flex gap-3 font-semibold my-3 text-md">
          <input
            type="checkbox"
            onChange={ToggleFinished}
            checked={ShowFinished}
            id=""
          />
          Show Finished Tasks :
        </div>
        <h2 className="font-bold text-xl">Your Todo's - </h2>
        <div className="todo flex flex-col my-4">
          {todos.length === 0 && <div> No Tasks to display </div>}
          {todos.map((item) => {
            return (
              (ShowFinished || !item.isComplete) && (
                <div
                  key={item.id}
                  className="text flex justify-between my-1.5 w-full bg-cyan-100 rounded-3xl px-4 py-1.5 items-center"
                >
                  <div className="flex gap-5 break-words whitespace-normal">
                    <input
                      type="checkbox"
                      name={item.id}
                      onChange={handleCheckbox}
                      checked={item.isComplete}
                      id=""
                    />
                    <div className={item.isComplete ? "line-through" : ""}>
                      <div className="w-[150px]">{item.todo}</div>
                    </div>
                  </div>
                  <div className="buttons flex">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-gray-500 hover:bg-gray-600 p-2 py-1 text-sm font-bold text-white rounded-md mx-1 h-8"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <linearGradient
                            id="cyanGradient"
                            x1="0"
                            y1="0"
                            x2="1"
                            y2="1"
                          >
                            <stop offset="0%" stop-color="#00FFFF" />
                            <stop offset="100%" stop-color="#0099CC" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M4 20H20"
                          stroke="url(#cyanGradient)"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                        <path
                          d="M14.7 4.3C15.1 3.9 15.8 3.9 16.2 4.3L19.7 7.8C20.1 8.2 20.1 8.9 19.7 9.3L9 20H4V15L14.7 4.3Z"
                          fill="url(#cyanGradient)"
                          stroke="#006B7A"
                          stroke-width="1"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="bg-gray-500 hover:bg-gray-600 p-2 py-1 text-sm font-bold text-white rounded-md mx-1 h-8"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <linearGradient
                            id="trashGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop offset="0%" stop-color="#00FFFF" />
                            <stop offset="100%" stop-color="#007788" />
                          </linearGradient>
                        </defs>
                        <rect
                          x="6"
                          y="7"
                          width="12"
                          height="14"
                          rx="2"
                          fill="url(#trashGradient)"
                          stroke="#006B7A"
                          stroke-width="1.5"
                        />
                        <path
                          d="M9 10V17"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                        <path
                          d="M15 10V17"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                        <path
                          d="M5 6H19"
                          stroke="#00FFFF"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                        <rect
                          x="9"
                          y="3"
                          width="6"
                          height="3"
                          rx="1"
                          fill="#00CCCC"
                          stroke="#006B7A"
                          stroke-width="1"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}
export default App;
