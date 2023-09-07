/* eslint-disable react/jsx-no-duplicate-props */
import {useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
//import Navbar from './Components/Navbar';
import TasksList from './Components/TasksList';
import { createGlobalState } from 'react-hooks-global-state';
import { BsFillCalendarPlusFill } from 'react-icons/bs';
import {IoMdAddCircle} from 'react-icons/io';
import toast, { Toaster } from 'react-hot-toast';


export const { useGlobalState } = createGlobalState({data: null});
export const checkTasks = () => {
  if(localStorage.getItem("storageTasks") === null)
    localStorage.setItem("storageTasks", "[]");
}
export const getTasks = () => {
  checkTasks();
  return JSON.parse(localStorage.getItem("storageTasks"));
}
export const updateTasks = (tasks) => {
  localStorage.setItem("storageTasks", JSON.stringify(tasks));
}
export const completeTask = (currentId, bool) => {
  const tasks = getTasks();
  tasks[currentId].iscompleted = bool;
  updateTasks(tasks);
}
export const getStorageToken = () => {
  if(localStorage.getItem("storageToken") === null)
    localStorage.setItem("storageToken", uuidv4());
  return localStorage.getItem("storageToken");
}
export const removeTask = (currentId) => {
  const tasks = getTasks();
  const newTasks = tasks.filter((task) => {
    return task.id !== currentId;
  });
  updateTasks(newTasks);
}
export const editTaskContent = (currentId, content, content2, content3, name) => {
  const tasks = getTasks();
  tasks[currentId].body = content;
  tasks[currentId].age = content2;
  tasks[currentId].check = content3;
  tasks[currentId].name = name;
  updateTasks(tasks);
}
function App() {
  const [name, setName] = useState('');
  const [data, setData] = useGlobalState('data');
  const [age, setAge] = useState('');
  const [check, setCheck] = useState('');
  const [body, setBody] = useState('');
  useEffect(() => {
    setData(getTasks());
  }, [])
  //})
  const addTask = (name, body, age, check, datetime, iscompleted, token) => {
    checkTasks();
    const id = getTasks().length === 0 ? 0 : getTasks()[getTasks().length - 1].id + 1;
    const object = {id, name, body, age, check, datetime, iscompleted, token};
    const tasks = getTasks();
    tasks.push(object);
    updateTasks(tasks);
  }
  const submitTask = () =>{
    const current = new Date();
    const cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
    const cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
    const datetime = cDate + ' ' + cTime;
    if(name === '' || body === '' || age === '' || check === ''){
      toast.error('Fill the blank fields');
    }else{
      addTask(name, body, age, check, datetime, false, getStorageToken());
      setData(getTasks());
      setName('');
      setAge('');
      setCheck('');
      setBody('');
    }
  }


  return (
    <div className="App">
      {/* <Navbar></Navbar> */}
      <div className="add-task">
        <h1><BsFillCalendarPlusFill></BsFillCalendarPlusFill> Insert Row</h1>
        <ul className="task-options">
          <li>
            <input className='input_name' type="text" placeholder='Name' 
            required 
            value={name} 
            onChange={(e) => setName(e.target.value)}/> 
          </li>
          <li>
            <input className='input_age'
            type="number"
            placeholder='Age:'
            min="18"
            max="100"
            value={age}
            onChange={(e) => setAge(e.target.value)}/>
          </li>
          <li>
            <select className='input_body' value={body} onChange={(e) => setBody(e.target.value)}>
              <option value="">Subscribed</option>
              <option value="Subscribed">Subscribed</option>
              <option value="Not Subscribed">Not Subscribed</option>
              <option value="Other">Other</option>
            </select>
          </li>
          <li className='input_check'>
            <input type="checkbox" placeholder='Unemployed' 
              required
              value="Employed"
              onChange={(e) => setCheck(e.target.value)}/>
            <label>
              Employed
            </label>
          </li>
          <Toaster />
          <button onClick={submitTask}><IoMdAddCircle></IoMdAddCircle>Add task</button>
        </ul>
      </div>
       {data && <TasksList data={data}></TasksList>}
    </div>
  );
}
export default App;
