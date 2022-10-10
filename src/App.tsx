import React from 'react';
import './App.css';
import {Todolist} from './Todolist';

const tasks1 = [
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false }
]
const tasks2 = [
    { id: 1, title: "Hello world", isDone: true },
    { id: 2, title: "I am Happy", isDone: false },
    { id: 3, title: "Yo", isDone: false }
]

export const App = () => {
    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={tasks1}/>
            <Todolist title={'What to read'} tasks={tasks2}/>
            {/*<Todolist title={'Movies'}/>*/}
            {/*<div>*/}
            {/*    <h3>What to learn</h3>*/}
            {/*    <div>*/}
            {/*        <input/>*/}
            {/*        <button>+</button>*/}
            {/*    </div>*/}
            {/*    <ul>*/}
            {/*        <li><input type="checkbox" checked={true}/> <span>HTML&CSS</span></li>*/}
            {/*        <li><input type="checkbox" checked={true}/> <span>JS</span></li>*/}
            {/*        <li><input type="checkbox" checked={false}/> <span>React</span></li>*/}
            {/*    </ul>*/}
            {/*    <div>*/}
            {/*        <button>All</button>*/}
            {/*        <button>Active</button>*/}
            {/*        <button>Completed</button>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
}
