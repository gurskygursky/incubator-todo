export type TodolistResponseType = {
    id: string;
    title: string;
    addedDate: string;
    order: number;
}
export type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}