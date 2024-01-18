import React, { useState } from 'react';
import Form from './Form';
import { v4 as uuidv4 } from 'uuid';
import Todo from './Todo';
import Edit from './Edit';

const TodoList = () => {
    const [todoValue, setTodo] = useState([]);
    const [originalTodos, setOriginalTodos] = useState([]);

    const createTodo = todo => {
        if (todo.trim() === "") {
            alert("You haven't written any tasks.");
            return;
        }

        if (todoValue.some(existingTodo => existingTodo.task === todo)) {
            alert("This task already exists");
            return;
        }

        setTodo([...todoValue, { id: uuidv4(), task: todo, isEditing: false }]);
    }

    const editTodo = id => {
        setOriginalTodos([...todoValue]);
        setTodo(todoValue.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo));
    }

    const editTask = (task, id) => {
        if (task.trim() === "") {
            alert("You haven't written any tasks.");
            return;
        }

        if (todoValue.some(existingTodo => existingTodo.task === task)) {
            alert("This task already exists");
            return;
        }

        setTodo(todoValue.map(todo => todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo));
    }

    const cancelEdit = () => {
        setTodo([...originalTodos]);
        setOriginalTodos([]);
    }

    const deleteTodo = id => {
        setTodo(todoValue.filter(todo => todo.id !== id));
    }

    return (
        <div className='container bg-gray-700 mt-20 p-8 rounded-md'>
            <h1 className='text-violet-800 font-bold text-5xl mb-5'>To Do List</h1>
            <Form createTodo={createTodo} />
            {todoValue.length === 0 ? (
                <p className='flex items-center w-auto bg-violet-800 text-white py-3 px-4 rounded-md mb-1 cursor-pointer text-xl'>
                    You don't have any tasks that need doing right now.
                </p>
            ) : (
                todoValue.map((todo, idx) =>
                    todo.isEditing ? (
                        <Edit key={idx} editTodo={editTask} task={todo} onCancel={cancelEdit} />
                    ) : (
                        <Todo task={todo} key={idx} editTodo={editTodo} deleteTodo={deleteTodo} />
                    )
                )
            )}
        </div>
    )
}

export default TodoList