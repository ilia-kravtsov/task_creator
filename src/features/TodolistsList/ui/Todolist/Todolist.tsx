import React, {useEffect} from "react";
import {TodolistDomainType} from "features/TodolistsList/model/todolists/todolists.reducer";
import {tasksThunks} from "features/TodolistsList/model/tasks/tasks.reducer";
import {useActions} from "common/hooks";
import {AddItemForm} from "common/components";
import {TaskType} from "features/TodolistsList/api/tasks/tasksApiTypes";
import {FilterTasksButtons} from "features/TodolistsList/ui/Todolist/FilterTasksButtons/FilterTasksButtons";
import {Tasks} from "features/TodolistsList/ui/Todolist/Tasks/Tasks";
import {TodolistTitle} from "features/TodolistsList/ui/Todolist/TodolistTitle/TodolistTitle";
import s from './Todolist.module.css'

type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};
export const Todolist = React.memo(function ({todolist, tasks}: Props) {

  const { fetchTasks, addTask} = useActions(tasksThunks);

  useEffect(() => {
    fetchTasks(todolist.id);
  }, []);

  const addTaskCB = (title: string) => {
      return addTask({title, todolistId: todolist.id}).unwrap()
    }

  return (
    <div className={s.todolistContainer}>
      <TodolistTitle todolist={todolist}/>
      <AddItemForm addItem={addTaskCB} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} tasks={tasks}/>
      <div style={{ paddingTop: "10px" }}>
          <FilterTasksButtons todolist={todolist}/>
      </div>
    </div>
  );
});
