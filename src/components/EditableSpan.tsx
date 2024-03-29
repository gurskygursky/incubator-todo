import TextField from '@mui/material/TextField/TextField';
import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';

type PropsType = {
    title: string;
    callback: (title: string) => void;
}

export const EditableSpan = memo((props: PropsType) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(props.title);

    const callbackHandler = () => {
        props.callback(title);
        setEdit(!edit);
    };
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
            ? <TextField id="outlined-basic" label={'Enter task title'}
                         variant="outlined"
                         size={'small'}
                         value={title}
                         onChange={onChangeHandler}
                         onKeyDown={onKeyPressHandler}
                         autoFocus={true}
                         onBlur={callbackHandler}
            />
            : <span onDoubleClick={editMode}>{props.title}</span>
    );
});
