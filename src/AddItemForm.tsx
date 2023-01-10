import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
    callback: (title: string) => void;
}

export const AddItemForm = (props: PropsType) => {

    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const callbackHandler = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.callback(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
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
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={callbackHandler}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};
