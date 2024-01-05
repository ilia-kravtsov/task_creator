import React from 'react';
import {Task} from "features/TodolistsList/ui/Todolist/Tasks/Task/Task";
import {TaskStatuses} from "common/enums";
import {TaskType} from "features/TodolistsList/api/tasks/tasksApiTypes";
import {TodolistDomainType} from "features/TodolistsList/model/todolists/todolists.reducer";
import s from 'features/TodolistsList/ui/Todolist/Tasks/Tasks.module.css'
import { useAutoAnimate } from '@formkit/auto-animate/react';

type Props = {
    tasks: TaskType[]
    todolist: TodolistDomainType
}
export const Tasks = ({tasks, todolist}: Props) => {
    const [animationParent] = useAutoAnimate();
    let tasksForTodolist = tasks;

    if (todolist.filter === "active") {
        tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
    }
    if (todolist.filter === "completed") {
        tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
    }

    return (
        <ul className={s.tasksList} ref={animationParent}>
            {
                tasksForTodolist.map((t) => (
                    <Task key={t.id} task={t} todolistId={todolist.id}/>
                ))}
        </ul>
    );
};

