import { useState, useEffect } from "react";

export default function App() {
  // Initialize todos from localStorage or default
  const [todo, setTodo] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [
      { id: 1, task: "Learning react", completed: false },
      { id: 2, task: "Making projects", completed: false },
    ];
  });

  // Manage id count separately (can also be saved to localStorage)
  const [id, setId] = useState(() => {
    const savedId = localStorage.getItem("nextId");
    return savedId ? Number(savedId) : 3;
  });

  // Save todos and id to localStorage whenever todo or id changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
    localStorage.setItem("nextId", id.toString());
  }, [todo, id]);

  const addTodo = (task) => {
    const newTodo = { id: id, task: task, completed: false };
    setId(id + 1);
    setTodo([...todo, newTodo]);
  };

  const toggleCompleted = (id) => {
    const updatedTodo = todo.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setTodo(updatedTodo);
  };

  return (
    <>
      <AddTodo addTodo={addTodo} />
      <DisplayTodo todo={todo} toggleCompleted={toggleCompleted} />
    </>
  );
}

function DisplayTodo({ todo, toggleCompleted }) {
  return (
    <div>
      <h2>Todo List</h2>
      {todo.map((item) => (
        <div key={item.id}>
          <h3>{item.task}</h3>
          <p>Completed: {item.completed ? "Yes" : "No"}</p>
          <button onClick={() => toggleCompleted(item.id)}>
            Mark as {item.completed ? "Incomplete" : "Completed"}
          </button>
        </div>
      ))}
    </div>
  );
}

function AddTodo({ addTodo }) {
  const [task, setTask] = useState("");

  const handleTask = () => {
    if (task.trim() !== "") {
      addTodo(task);
      setTask("");
    }
  };

  return (
    <>
      <input
        type="text"
        value={task}
        placeholder="Enter a new task"
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={handleTask}>Add new Todo</button>
    </>
  );
}


