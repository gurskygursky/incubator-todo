import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
    title: string;
    callback: (title: string) => void;
}

export const EditableSpan = (props: PropsType) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(props.title);

    const callbackHandler = () => {
        props.callback(title);
        setEdit(!edit);
    }
    const editMode = () => {
        setEdit(!edit)
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        const {key} = event;

        if (key === 'Enter') {
            callbackHandler();
        }
    }


    return (
        edit
            ? <input type="text" value={title}
                     onChange={onChangeHandler}
                     onKeyDown={onKeyPressHandler}
                     onBlur={callbackHandler} autoFocus/>
            : <span onDoubleClick={editMode}>{props.title}</span>
    );
};
