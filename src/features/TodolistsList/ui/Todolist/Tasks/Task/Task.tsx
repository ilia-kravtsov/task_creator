import React, {ChangeEvent, FC, useCallback} from "react";
import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { EditableSpan } from "common/components";
import { TaskStatuses } from "common/enums";
import {TaskType} from "features/TodolistsList/api/tasks/tasksApiTypes";
import {useActions} from "common/hooks";
import {tasksThunks} from "features/TodolistsList/model/tasks/tasks.reducer";
import s from 'features/TodolistsList/ui/Todolist/Tasks/Task/Task.module.css'

type Props = {
  task: TaskType;
  todolistId: string;
};

export const Task = React.memo(({task, todolistId}: Props) => {

  const {removeTask, updateTask} = useActions(tasksThunks)
  const removeTaskHandler = () => removeTask({ taskId: task.id, todolistId});

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
      let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        updateTask({
            taskId: task.id,
            domainModel: {status},
            todolistId: todolistId,
        });
    }

  const changeTaskTitleHandler = (title: string) => {
        updateTask({taskId:task.id, domainModel: { title }, todolistId})
    }

  return (
    <li key={task.id} className={task.status === TaskStatuses.Completed ? s.task + ' ' + s.isDone : s.task}>
      <Checkbox checked={task.status === TaskStatuses.Completed} color="primary" onChange={changeTaskStatusHandler} />

      <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
      <IconButton onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </li>
  );
});
