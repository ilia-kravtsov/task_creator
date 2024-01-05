import React, {useCallback} from 'react';
import {Button, ButtonGroup} from "@mui/material";
import {useActions} from "common/hooks";
import {
    FilterValuesType,
    TodolistDomainType,
    todolistsActions
} from "features/TodolistsList/model/todolists/todolists.reducer";

type Props = {
    todolist: TodolistDomainType
}
export const FilterTasksButtons = ({todolist}:Props) => {

    const {id, filter} = todolist
    const { changeTodolistFilter } = useActions(todolistsActions);

    const FilterChanger = (filter: FilterValuesType) => changeTodolistFilter({id, filter})

    return (
        <ButtonGroup>
            <Button variant={filter === "all" ? "contained" : "outlined"}
                    onClick={() => FilterChanger("all")}
                    color={"primary"}>
                All
            </Button>
            <Button variant={filter === "active" ? "contained" : "outlined"}
                    onClick={() => FilterChanger("active")}
                    color={"primary"}>
                Active
            </Button>
            <Button variant={filter === "completed" ? "contained" : "outlined"}
                    onClick={() => FilterChanger("completed")}
                    color={"primary"}>
                Completed
            </Button>
        </ButtonGroup>
    );
};

