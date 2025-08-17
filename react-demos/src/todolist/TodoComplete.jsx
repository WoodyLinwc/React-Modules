import React from "react";

const TodoComplete = ({ todos }) => {
    const completed = todos.filter((todo) => todo.completed === true);
    const uncompleted = todos.filter((todo) => todo.completed === false);

    return (
        <div>
            <div>Total todos: {todos.length}</div>
            <div>Completed todos: {completed.length}</div>
            <div>Uncompleted todos: {uncompleted.length}</div>
        </div>
    );
};

export default TodoComplete;
