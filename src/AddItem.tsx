import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
    callback: (value: string) => void;
}

export const AddItem: React.FC<PropsType> = (props) => {

    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState<string>('');

    const styleError = error ? {outline: 'none', borderColor: 'crimson', borderRadius: '3px'} : {
        outline: 'none',
        borderColor: ''
    };


    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.value === '') {
            setError('Incorrect input values');
        }
        if (event.currentTarget.value !== '') {
            setError('');
        }
        setInputValue(event.currentTarget.value);
    }

    const onClickHandler = () => {
        if (inputValue.trim() !== '') {
            props.callback(inputValue);
            setInputValue('');
            setError('');
        }
        if (inputValue.trim() === '') {
            setError('Incorrect input values');
        }
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        const {key} = event;
        if (key === 'Enter') {
            if (inputValue !== '') {
                onClickHandler();
            }
            if (inputValue === null) {
                setError('Incorrect input value');
            }
        }
    }

    const onBlurHandler = (event: ChangeEvent<HTMLInputElement>) => {
        // if (event.currentTarget.value === '') {
        //     setError('Incorrect input values');
        // }
        if (event.currentTarget.value !== '') {
            setError('');
        }
    }

    return (
        <div>
            <input style={styleError} value={inputValue} onChange={onChangeHandler} onKeyDown={onKeyPressHandler} onBlur={onBlurHandler}/>
            <button onClick={onClickHandler}>+</button>
            <div style={{color: 'crimson'}}>{error}</div>
        </div>
    );
}
