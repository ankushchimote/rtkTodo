import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTodoList,
  addTodo,
  sortTodo,
  updateTodo,
  toggleCompleted,
} from "../TodoSlice";
import { TiPencil } from "react-icons/ti";
import { BsTrash } from "react-icons/bs";
import { useState } from "react";
import { useEffect } from "react";

const TodoList = () => {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todo.todoList);
  const sortCriteria = useSelector((state) => state.todo.sortCriteria);
  const [showModal, setShowModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    if (todoList.length > 0) {
      localStorage.setItem("todoList", JSON.stringify(todoList));
    }
  }, [todoList]);

  useEffect(() => {
    const localTodoList = JSON.parse(localStorage.getItem("todoList"));
    if (localTodoList) {
      dispatch(setTodoList(localTodoList));
    }
  }, []);

  const handleAddTodo = (task) => {
    if (newTask.trim().length === 0) { //task
      alert("Please enter a task");
    } else {
      dispatch(
        addTodo({
          task: task,
          id: Date.now(),
        })
      );
      setNewTask("");
      setShowModal(true);
    }
  };

  const handleUpdateTodoList = (id, task) => {
    if (newTask.trim().length === 0) {
      alert("Please enter a task");
    } else {
      dispatch(
        updateTodo({
          task: task,
          id: id,
        })
      );
      setShowModal(false);
    }
  };

  const handleDeleteTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id != id);
    dispatch(setTodoList(updatedTodoList));
    localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
  };

  const sortTodoList = todoList.filter((todo) => {
    if (sortCriteria === "All") return true;
    if (sortCriteria === "Completed" && todo.completed) return true;
    if (sortCriteria === "Not Completed" && !todo.completed) return true;
    return false;
  });

  const handleToggleCompleted = (id) => {
    dispatch(toggleCompleted({ id }));
  };

  return (
    <>
      <div>
        {showModal && (
          <div className="fixed w-full left-0 top-0 h-full bg-[#000000D8] flex items-center justify-center">
            <div className="bg-white p-8 rounded-md text-center">
              <input
                type="text"
                className="bg-white border p-2 rounded-md outline-none mb-8"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder={
                  currentTodo ? "Update your task here" : "Enter task here"
                }
              />
              <div className="flex justify-between gap-5">
                {currentTodo ? (
                  <>
                    <button
                      className="bg-[#1A2E35] rounded-md text-white py-3 px-8"
                      onClick={() => {
                        setShowModal(false);
                        handleUpdateTodoList(currentTodo.id, newTask);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="text-center bg-[#FF4F5A] rounded-md text-white py-3 px-10"
                      onClick={() => {
                        setShowModal(false);
                        handleUpdateTodoList(currentTodo.id, newTask);
                      }}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                  <div className="flex justify-between gap-5">
                    <button
                      className="bg-[#1A2E35] rounded-md text-white py-3 px-10"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-[#FF4F5A] rounded-md text-white py-3 px-10"
                      onClick={() => {
                        handleAddTodo(newTask);
                        setShowModal(false);
                      }}
                    >
                      Add
                    </button>
                  </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="flex items-center justify-center flex-col">
          {todoList.length === 0 ? (
            <>
              <div className="mb-8">
                <p className="text-center text-gray-500">
                  You have no todo's, please add one
                </p>
              </div>
            </>
          ) : (
            <div className="container mx-auto mt-6">
              <div>
                {sortTodoList.map((todo) => (
                  <div
                    key={todo.id}
                    className="flex items-center justify-between mb-6 bg-pink-400 mx-auto w-full md:w-[75%] rounded-md p-4"
                  >
                    <div
                      className={`${
                        todo.completed
                          ? "line-through text-green-800"
                          : "text-black"
                      }`}
                      onClick={() => {
                        handleToggleCompleted(todo.id);
                      }}
                    >
                      {todo.task}
                    </div>
                    <div>
                      <button
                        className="bg-blue-500 text-white p-1 rounded-md ml-2"
                        onClick={() => {
                          setShowModal(true);
                          setCurrentTodo(todo);
                          setNewTask(todo.task);
                        }}
                      >
                        <TiPencil />
                      </button>
                      <button
                        className="bg-orange-500 text-white p-1 rounded-md ml-2"
                        onClick={() => handleDeleteTodo(todo.id)}
                      >
                        <BsTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <button
            className="bg-[#FF4F5A] text-center text-white 
        py-3 px-10 rounded-md"
            onClick={() => setShowModal(true)}
          >
            Add Task
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoList;
