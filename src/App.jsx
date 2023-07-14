import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
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

  const handleToggleDone = (index) => {
    const updatedTodos = [...todos];
    const [removedTodo] = updatedTodos.splice(index, 1);
    updatedTodos.push({ ...removedTodo, done: !removedTodo.done });
    setTodos(updatedTodos);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
        {/* navbar */}
        <div className="flex flex-row items-center justify-between w-full px-10 py-4">
          <div className="flex flex-row items-center justify-center">
            {/* get todos lenght without done todo  */}
            <h1 className="text-l font-bold text-gray-800">Todo: {
              todos.filter((todo) => !todo.done).length
            }</h1>
          </div>
          <div className="flex flex-row items-center justify-center">
            <button
              className="px-4 py-2 text-sm font-bold text-white bg-gray-800 rounded-lg shadow-md w-20  focus:outline-none hover:bg-gray-950"
              onClick={() => setTodos([])}
            >
              Clear
            </button>

          </div>

        </div>

        <div className="flex flex-col items-center justify-center w-full flex-1 py-20 px-20 text-center">
          <h1 className="text-6xl font-bold mb-4 text-gray-800">Daymate</h1>
          <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
            <div className="w-full sm:w-1/2">
              <div className="flex flex-col items-center justify-center w-full">
                <div className="flex flex-col items-center justify-center w-full">
                  <input
                    className="w-80 h-12 px-4 py-2 mb-4 text-l text-gray-800 bg-white rounded-lg border-4 border-gray-800  focus:border-purple-700 focus:outline-none"
                    type="text"
                    placeholder="Todo"
                    value={newTodo}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                  />
                  <button
                    className="px-4 py-2 mb-4 text-l font-bold text-white bg-gray-800 hover:bg-gray-950 rounded-lg shadow-md w-80 h-12 focus:outline-none"
                    onClick={handleAddTodo}
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-col items-center justify-center w-full mt-4">
                  {todos.map((todo, index) => (
                    <div
                      key={index}
                      className={`w-80 px-4 py-2 my-2 flex items-center ${todo.done
                        ? 'line-through text-gray-500 animate-todo-done'
                        : 'text-gray-700 bg-gray-100'
                        } rounded-lg border-4 border-gray-800 focus:border-purple-700 focus:outline-none`}
                    >
                      <input
                        type="checkbox"
                        checked={todo.done}
                        onChange={() => handleToggleDone(index)}
                        className="mr-2 w-min h-min accent-purple-700"
                      />
                      <p className="text-l bg-transparent truncate">{todo.text}</p>
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
    </>
  );
}

export default App;
