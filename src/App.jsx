import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("General");
  const categories = ["General", "Work", "Personal", "Shopping"];

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, { text: input, completed: false, id: Date.now(), category }]);
    setInput("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-6 border border-gray-300"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Todo List</h1>

        <div className="flex flex-col gap-3 mb-4">
          <input
            type="text"
            placeholder="Add a new task"
            className="flex-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
          />
          <select
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
            onClick={addTask}
          >Add Task</button>
        </div>

        <ul className="space-y-3">
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.li
                key={task.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between bg-gray-100 p-3 rounded-xl shadow-sm"
              >
                <div className="flex-1 cursor-pointer" onClick={() => toggleTask(task.id)}>
                  <span className={`${task.completed ? 'line-through text-gray-400' : 'text-gray-800'} font-medium`}>{task.text}</span>
                  <span className="ml-2 text-sm text-gray-500 italic">[{task.category}]</span>
                </div>
                <button
                  className="text-red-500 font-bold hover:text-red-700"
                  onClick={() => removeTask(task.id)}
                >×</button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        {tasks.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No tasks yet. Add your first task!</p>
        )}
      </motion.div>
    </div>
  );
}
