import React, { useState } from "react";

const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState("");

    const startEditing = (todo) => {
        setEditingId(todo.id);
        setEditingText(todo.text);
    };

    const saveEdit = (id) => {
        if (editingText.trim()) {
            onEdit(id, editingText);
        }
        // set editing id and text to default
        setEditingId(null);
        setEditingText("");
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditingText("");
    };

    const handleKeyDown = (e, id) => {
        if (e.key === "Enter") {
            saveEdit(id);
        } else if (e.key === "Escape") {
            cancelEdit();
        }
    };

    if (todos.length === 0) {
        return (
            <div>
                <p>Add some todos!</p>
            </div>
        );
    }

    return (
        <div>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {editingId === todo.id ? (
                            // edit mode
                            <div>
                                <input
                                    type="text"
                                    value={editingText}
                                    onChange={(e) =>
                                        setEditingText(e.target.value)
                                    }
                                    onKeyDown={(e) => handleKeyDown(e, todo.id)}
                                    autoFocus
                                />
                                <button onClick={() => saveEdit(todo.id)}>
                                    Save
                                </button>
                                <button onClick={cancelEdit}>Cancel</button>
                            </div>
                        ) : (
                            // display todo list
                            <div>
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
                                <button onClick={() => startEditing(todo)}>
                                    Edit
                                </button>
                                <button onClick={() => onDelete(todo.id)}>
                                    Delete
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
