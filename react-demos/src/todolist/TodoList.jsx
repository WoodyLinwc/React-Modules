import React from "react";

const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {
    if (todos.length === 0) {
        return (
            <div>
                <p>Add some todos!</p>
            </div>
        );
    }

    return (
        <div>
            <div>Total todos: {todos.length}</div>

            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <span
                            onClick={() => onToggle(todo.id)}
                            style={{
                                textDecoration: todo.completed
                                    ? "line-through"
                                    : "none",
                            }}
                        >
                            {todo.text}
                        </span>
                        <button onClick={() => onDelete(todo.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
