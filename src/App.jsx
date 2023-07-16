import { useState, useEffect } from 'react';
import './App.css';
import { IoTrash, IoCheckmarkOutline, IoArrowUpOutline } from "react-icons/io5";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    const storedShowTutorial = localStorage.getItem('showTutorial');
    if (storedShowTutorial == 'true') {
      setShowTutorial(true);
      localStorage.setItem('showTutorial', false);
    }
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    if (todos.length) {
      localStorage.setItem('todos', JSON.stringify(todos));
    } else {
      localStorage.removeItem('todos');
    }
  }, [todos]);


  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      const updatedTodos = [...todos, { text: newTodo, done: false }];
      setTodos(updatedTodos);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const handleToggleDone = () => {
    const updatedTodos = [...todos];
    updatedTodos[selectedTodo.index].done = !updatedTodos[selectedTodo.index].done;
    setTodos(updatedTodos);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace") {
      if (selectedTodo !== null) {
        handleDeleteTodo(selectedTodo.index);
        if (selectedTodo.index > 0) {
          selectTodo(selectedTodo.index - 1);
        }
      }
    }
    if (e.key === 'Enter') {
      if (selectedTodo !== null) {
        handleToggleDone(selectedTodo.index);
      } else {
        handleAddTodo();
      }
    }
    if (e.key === 'ArrowUp') {
      if (selectedTodo !== null) {
        if (selectedTodo.index > 0) {
          selectTodo(selectedTodo.index - 1);
        }
      }
    }
    if (e.key === 'ArrowDown') {
      if (selectedTodo !== null) {
        if (selectedTodo.index < todos.length - 1) {
          selectTodo(selectedTodo.index + 1);
        }
      }
    }
  };

  const selectTodo = (index) => {
    setSelectedTodo({
      ...todos[index], // Spread the todo object
      index, // Save the index separately
    });
  };

  const clearSelectedTodo = () => {
    setSelectedTodo(null);
  };

  const handleTutorialClose = () => {
    setShowTutorial(false);
  };

  const handleHelp = () => {
    setShowTutorial(true);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
        {/* navbar */}
        <div className="flex flex-row items-center justify-between w-full px-10 py-4">
          <div className="flex flex-row items-center justify-center">
            {/* get todos length without done todos */}
            <h1 className="text-l font-bold text-gray-800 animate-fade-in">
              Todo: {todos.filter((todo) => !todo.done).length}
            </h1>
          </div>
          <div className="flex flex-row items-center justify-center">
            <div className='mx-10 cursor-pointer text-gray-800 text-sm font-bold hover:text-purple-700 animate-fade-in'
              onClick={handleHelp}>
              Help
            </div>
            <button
              className="px-4 py-2 animate-fade-in text-sm font-bold text-gray-800 border-4 border-gray-800 rounded-lg shadow-md flex items-center focus:outline-none hover:border-red-700 hover:text-red-700"
              onClick={() => setTodos([])}
            >
              Clear
              <IoTrash className="ml-2 text-xl" />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full flex-1 py-20 px-20 text-center ">
          <div className="animate-fade-in">
            <h1 className="text-6xl mb-4 text-gray-800 ">Daymate</h1>
          </div>


          <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
            <div className="w-full sm:w-1/2">
              <div className="flex flex-col items-center justify-center w-full">
                <div className="flex flex-col items-center justify-center w-full">
                  <input
                    className="w-80 h-12 px-4 py-2 mb-4 text-l text-gray-800 bg-gray-100 rounded-lg border-4 border-gray-800 focus:border-purple-700 focus:outline-none"
                    type="text"
                    placeholder={'Todo...'}
                    value={newTodo}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onClick={clearSelectedTodo}
                  />
                  <button
                    className="px-4 py-2 mb-4 text-l font-bold text-white bg-gray-800 hover:bg-gray-950 rounded-lg shadow-md w-80 h-12 focus:outline-none"
                    onClick={handleAddTodo}
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-col items-center justify-center w-full mt-4">
                  {todos
                    .sort((a, b) => (a.done && !b.done ? 1 : b.done && !a.done ? -1 : 0)) // Sort todos with done items at the bottom
                    .map((todo, index) => (
                      <div
                        key={index}
                        onClick={() => selectTodo(index)}
                        onKeyDown={handleKeyDown}
                        tabIndex={0} // Add tabIndex attribute
                        className={`w-80 px-4 py-2 my-2 flex items-center ${todo.done
                          ? 'line-through text-gray-500'
                          : 'text-gray-700 bg-gray-100 animate-slide-up'
                          } rounded-lg border-4 cursor-pointer ${selectedTodo && selectedTodo.index === index
                            ? 'border-purple-700'
                            : 'border-gray-800'
                          } focus:outline-none`}
                      >
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={todo.done}
                            onChange={() => handleToggleDone(index)}
                            className="hidden"
                          />
                          <div className="w-6 h-6 border-2 rounded-full border-gray-800 flex items-center justify-center mr-4">
                            {todo.done && (
                              <IoCheckmarkOutline
                                className="rounded-full text-white h-4 w-4 bg-purple-700"
                              />
                            )}
                          </div>
                          <p className="text-l bg-transparent truncate">{todo.text}</p>
                        </label>
                        <button
                          onClick={() => handleDeleteTodo(index)}
                          className="ml-auto text-red-500 hover:text-red-700 focus:outline-none bg-transparent"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showTutorial && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 bg-white">🎉 Welcome to Daymate!</h2>
            <p className="text-lg mb-4 bg-white">
              Here are some tips to get you started :-
            </p>
            <ul className="text-lg mb-4 list-disc list-inside">
              <li className='bg-white'>Press "Enter" to add a new todo</li>
              <li className='bg-white'>Press ⬆ or ⬇ to select a todo</li>
              <li className='bg-white'>Press "Enter" to toggle "Done" & "Undone"</li>
              <li className='bg-white'>Press "Backspace" to delete the selected todo</li>
            </ul>
            <button
              className="px-4 py-2 bg-gray-800 text-white font-bold rounded-lg shadow-md focus:outline-none"
              onClick={handleTutorialClose}
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
