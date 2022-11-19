import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    value: string;
    callback: (value: string) => void;
}

export const EditableSpan: React.FC<PropsType> = (props) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>(props.value);

    const activateEditMode = () => {
        setEdit(!edit);
        setInputValue(props.value);
    }

    const deactivateEditMode = () => {
        setEdit(!edit);
        props.callback(inputValue);
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value);
    }

    return (
        edit
            ? <input value={inputValue}
                     onBlur={deactivateEditMode}
                     onChange={onChangeHandler}
                     autoFocus
            />
            : <span onDoubleClick={activateEditMode}>{props.value}</span>
    )
}