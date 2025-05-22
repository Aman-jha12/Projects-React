import { useState } from "react";

// App Component
export default function App() {
  const [id, setId] = useState(3);
  const [todo, setTodo] = useState([
    {
      id: 1,
      task: "Learning react",
      completed: false,
    },
    {
      id: 2,
      task: "Making projects",
      completed: false,
    },
  ]);

  const addTodo = (task) => {
    const newTodo = {
      id: id,
      task: task,
      completed: false,
    };
    setId(id + 1); // increment id
    setTodo([...todo, newTodo]);
  };

  return (
    <>
      <AddTodo addTodo={addTodo} />
      <DisplayTodo todo={todo} />
    </>
  );
}


function DisplayTodo({ todo }) {
  return (
    <div>
      <h2>Todo List</h2>
      {todo.map((item) => (
        <div key={item.id}>
          <h3>{item.task}</h3>
          <p>Completed: {item.completed ? "Yes" : "No"}</p>
        </div>
      ))}
    </div>
  );
}

// AddTodo handles user input and calls addTodo
function AddTodo({ addTodo }) {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (task.trim() !== "") {
      addTodo(task);
      setTask(""); 
    }
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter new task"
        />
      </div>
      <div>
        <button onClick={handleAdd}>Add Todo</button>
      </div>
    </>
  );
}
