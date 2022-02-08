// Librairie
import React, { useEffect,useRef, useState } from 'react';
import classes from './App.module.css';
import axios from '../../axios-firebase';

// Composant
import Task from '../../Components/Task/Task';

function App() {

  // States
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  // Ref
  const inputRef = useRef("");

  // Cycle de vie
  useEffect(()=>{
    inputRef.current.focus();

    axios.get('/taches.json')
    .then(response=>{
      console.log(response);
      const newTasks = [];
      for (let key in response.data){
        newTasks.push({
          ...response.data[key],
          id:key
        })
      }
      setTasks(newTasks)
    })
    .catch(error=>{
      console.log(error);
    })
  },[]);

  // Fonctions
  const removeClickedHandler = index => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);

    axios.delete('/taches/'+ tasks[index].id +'.json')
    .then(response=>{
      console.log(response);
    })
    .catch(error=>{
      console.log(error);
    })
  }

  const doneClickedHandler = (index, event) => {
    const newTasks = [...tasks];
    newTasks[index].done = !tasks[index].done;
    setTasks(newTasks);
    console.log(newTasks[index]);

    // Axios
    axios.put('/taches/'+ tasks[index].id + '.json',
    newTasks[index])
    .then(response =>{
      console.log(response);
    })
    .catch(error =>{
      console.log(error);
    })
    
  }

  const submittedTaskHandler = event => {
    event.preventDefault();

    const newTask = {
      content: input,
      done: false
    }
    setTasks([...tasks, newTask]);
    setInput('')

    // Axios
    axios.post('/taches.json', newTask)
    .then(response =>{
      console.log(response);
    })
    .catch(error =>{
      console.log(error);
    })
    
  }

  const changedFormHandler = event => {
    setInput(event.target.value);
  }

  // Variables
  let tasksDisplayed = tasks.map((task, index) => (
    <Task
      done={task.done}
      content={task.content}
      key={index}
      removeClicked={() => removeClickedHandler(index)}
      doneClicked={() => doneClickedHandler(index)}
    />
  ));

  return (
    <div className={classes.App}>
      <header>
        <span>TO-DO</span>
      </header>

      <div className={classes.add}>
        <form onSubmit={(e) => submittedTaskHandler(e)}>
        <input
            type="text"
            value={input}
            ref={inputRef}
            onChange = {(e)=>changedFormHandler(e)}
            placeholder="Que souhaitez-vous ajouter ?" />
           
          <button type="submit">
            Ajouter
          </button>
        </form>
      </div>

      {tasksDisplayed}
    </div>
  );
}

export default App;
