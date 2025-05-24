import { useState, useEffect } from "react";

// App Component
export default function App() {
  // Load todos from localStorage or use default
  const [todo, setTodo] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos
      ? JSON.parse(savedTodos)
      : [
          { id: 1, task: "Learning React", completed: false },
          { id: 2, task: "Making Projects", completed: false },
        ];
  });

  const [id, setId] = useState(() => {
    const savedId = localStorage.getItem("nextId");
    return savedId ? Number(savedId) : 3;
  });

  // State for editing
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState("");

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
    localStorage.setItem("nextId", id.toString());
  }, [todo, id]);

  // Add todo
  const addTodo = (task) => {
    const newTodo = { id, task, completed: false };
    setTodo([...todo, newTodo]);
    setId(id + 1);
  };

  // Toggle completed
  const toggleCompleted = (id) => {
    const updated = todo.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setTodo(updated);
  };

  // Start editing
  const startEditing = (id, task) => {
    setEditId(id);
    setEditTask(task);
  };

  // Save edited task
  const saveEdit = () => {
    const updated = todo.map((item) =>
      item.id === editId ? { ...item, task: editTask } : item
    );
    setTodo(updated);
    setEditId(null);
    setEditTask("");
  };

  return (
    <>
      <h1>Todo App</h1>
      <AddTodo addTodo={addTodo} />
      <DisplayTodo
        todo={todo}
        toggleCompleted={toggleCompleted}
        startEditing={startEditing}
        editId={editId}
        editTask={editTask}
        setEditTask={setEditTask}
        saveEdit={saveEdit}
      />
    </>
  );
}

// AddTodo Component
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
      <button onClick={handleTask}>Add Todo</button>
    </>
  );
}

// DisplayTodo Component
function DisplayTodo({
  todo,
  toggleCompleted,
  startEditing,
  editId,
  editTask,
  setEditTask,
  saveEdit,
}) {
  return (
    <div>
      <h2>Todo List</h2>
      {todo.map((item) => (
        <div key={item.id}>
          {editId === item.id ? (
            <>
              <input
                type="text"
                value={editTask}
                onChange={(e) => setEditTask(e.target.value)}
              />
              <button onClick={saveEdit}>Save</button>
            </>
          ) : (
            <>
              <h3>{item.task}</h3>
              <p>Completed: {item.completed ? "Yes" : "No"}</p>
              <button onClick={() => toggleCompleted(item.id)}>
                Mark as {item.completed ? "Incomplete" : "Completed"}
              </button>
              <button onClick={() => startEditing(item.id, item.task)}>
                Edit
              </button>
            </>
          )}
          <hr />
        </div>
      ))}
    </div>
  );
}
