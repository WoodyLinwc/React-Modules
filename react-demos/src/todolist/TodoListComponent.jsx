import React, { useState } from "react";

const TodoListComponent = () => {
    const [todos, setTodos] = useState([]);

    // add a todo
    const addTodos = (text) => {
        const newTodos = {
            id: Date.now(),
            text: text.trim(),
            completed: false,
        };

        setTodos([...todos, newTodos]);
    };

    // toggle todo
    const toggleTodo = (id) => {
        setTodos(
            todos.map((todo) => {
                todo.id === id ? { ...todo, completed: !todo.completed } : todo;
            })
        );
    };

    // delete a todo
    const deleteTodo = (id) => {
        setTodos(
            todos.filter((todo) => {
                todo.id !== id;
            })
        );
    };

    // edit a todo
    const editTodo = (id, newText) => {
        setTodos(
            todos.map((todo) => {
                todo.id === id ? { ...todo, text: newText.trim() } : todo;
            })
        );
    };

    return (
        <div>
            <h2>Todo List</h2>

            <div>Total todos: {todos.length}</div>
        </div>
    );
};

export default TodoListComponent;
