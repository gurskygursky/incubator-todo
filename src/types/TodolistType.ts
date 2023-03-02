import { FilterValuesType } from "./FilterValuesType"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TodolistResponseType = {
    id: string;
    title: string;
    addedDate: string;
    order: number;
}
