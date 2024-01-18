import React from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';

const Todo = ({ task, editTodo, deleteTodo }) => {
    return (
        <div className='flex justify-between  items-center bg-violet-800 text-white py-3 px-4 rounded-md mb-1 cursor-pointer'>
            <p className='font-primary'>{task.task}</p>
            <div className='flex items-center gap-x-4'>
                <AiFillEdit className='text-xl text-amber-500' onClick={() => editTodo(task.id)} />
                <BsFillTrashFill className='text-xl text-red-600' onClick={() => deleteTodo(task.id)} />
            </div>
        </div>
    )
}

export default Todo