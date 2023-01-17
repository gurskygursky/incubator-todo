import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField/TextField';


type PropsType = {
    callback: (title: string) => void;
}

export const AddItemForm = (props: PropsType) => {

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
        setError(null);
        if (e.charCode === 13) {
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
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
            />
            {/*<input value={title}*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyPress={onKeyPressHandler}*/}
            {/*       className={error ? "error" : ""}*/}
            {/*/>*/}
            <Button variant="outlined" style={{minHeight: '40px', maxHeight: '40px'}}>+</Button>
            {/*<button onClick={callbackHandler}>+</button>*/}
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    );
};
