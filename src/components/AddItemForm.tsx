import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField/TextField';

type PropsType = {
    callback: (title: string) => void;
}

export const AddItemForm = memo((props: PropsType) => {

    console.log('AddItemForm is rendered');

    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const callbackHandler = () => {
        let newTitle = title.trim();
        if (newTitle !== '') {
            props.callback(newTitle);
            setTitle('');
        } else {
            setError('Title is required');
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.key === 'Enter') {
            callbackHandler();
        }
    }

    return (
        <div>
            <TextField id="outlined-basic" label={error ? error : 'Enter task title'}
                       variant="outlined"
                       size={'small'}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       error={!!error}
            />
            <Button variant="outlined" style={{minHeight: '40px', maxHeight: '40px'}}
                    onClick={callbackHandler}>+</Button>
        </div>
    );
});
