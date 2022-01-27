import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import {Todolist} from './Todolist';


export type FilterValuesType = "all" | "active" | "completed";

function App() {

    let [tasks, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false },
    ]);

    function removeTask(taskId: string) {
        let filteredTasks = tasks.filter(t => t.id !== taskId);
        setTasks(filteredTasks);
    }

    function addTask(title:string){
        let newTask =  { id: v1(), title: title, isDone: true };
        setTasks([newTask, ...tasks])
    }

    // let [filter, setFilter] = useState<FilterValuesType>("all");

    // let tasksForTodolist = tasks;

    // if (filter === "active") {
    //     tasksForTodolist = tasks.filter(t => t.isDone === false);
    // }
    // if (filter === "completed") {
    //     tasksForTodolist = tasks.filter(t => t.isDone === true);
    // }

    // function changeFilter(value: FilterValuesType) {
    //     setFilter(value);
    // }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasks}
                      removeTask={removeTask}
                      addTask = {addTask}
            />
        </div>
    );
}

export default App;