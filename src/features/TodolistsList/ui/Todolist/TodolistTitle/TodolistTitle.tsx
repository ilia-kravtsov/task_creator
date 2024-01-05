import React, {useCallback} from 'react';
import {EditableSpan} from "common/components";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useActions} from "common/hooks";
import {TodolistDomainType, todolistsThunks} from "features/TodolistsList/model/todolists/todolists.reducer";
import s from './TodolistTitleContainer.module.css'

type Props = {
    todolist: TodolistDomainType
}
export const TodolistTitle = ({todolist}: Props) => {

    const {entityStatus, id, title} = todolist
    const {removeTodolist, changeTodolistTitle} = useActions(todolistsThunks)
    const removeTodolistHandler = () => {
        removeTodolist(id);
    };

    const changeTodolistTitleHandler = useCallback((title: string) => {
            changeTodolistTitle({id, title});
        }, [id]);

    return (
        <h3 className={s.todolistTitleContainer}>
            <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
            <IconButton onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
                <Delete />
            </IconButton>
        </h3>
    );
};

