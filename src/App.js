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
    setTimeout(console.log( 'checkTasks=', localStorage.getItem("storageTasks")), 3000);
}
export const getTasks = () => {
  checkTasks();
  //if(localStorage.getItem("storageTasks") === "[]"){let test0 = [{test:'text'}];
  //updateTasks(test0);};
  setTimeout(console.log( 'getTasks=', localStorage.getItem("storageTasks")), 1000);
  return JSON.parse(localStorage.getItem("storageTasks"));
}//преобразует в массив
export const updateTasks = (tasks) => {
  console.log( 'updateTasks=', JSON.stringify(tasks), tasks);
  localStorage.setItem("storageTasks", JSON.stringify(tasks));
}//сохраняет в локал стораж localStorage.getItem("storageTasks")
export const completeTask = (currentId, bool) => {
  const tasks = getTasks();
  tasks[currentId].iscompleted = bool;//обновляет свойство iscompleted
  console.log( 'completeTask=', localStorage.getItem("storageTasks"), tasks);
  updateTasks(tasks);
}
export const getStorageToken = () => {
  if(localStorage.getItem("storageToken") === null)
    localStorage.setItem("storageToken", uuidv4());
    console.log( 'getStorageToken=', localStorage.getItem("storageTasks"));
  return localStorage.getItem("storageToken");
}//новый объект под задачу через импортироваанную функцию
export const removeTask = (currentId) => {
  const tasks = getTasks();
  const newTasks = tasks.filter((task) => {
    return task.id !== currentId;});
    console.log( 'removeTask=', newTasks);
  updateTasks(newTasks);
}//фильтрует задачу из массива и вызывает функцию сохранения в локал стораж
export const editTaskContent = (currentId, name, content2, content3, body) => {
  console.log( "test=", currentId, body, content2, content3, name);
  const tasks = getTasks();
  setTimeout(console.log( "editTaskContent=", tasks), 1000);
  const task = tasks.filter((a)=> a.id===currentId)[0]
  task.age = content2;
  task.check = content3;
  task.name = name;
  task.body = body;
  const newTasks = tasks.map((_task)=> { 
    if(_task.id===currentId) return task;
    else return _task;
  })
  console.log( "test5=", newTasks);
  updateTasks(newTasks);
  window.location.reload();
}//изменяет извлеченный по ИД массив и вызывает функцию сохранения в локал стораж
function App() {
  const [name, setName] = useState('');
  const [data, setData] = useGlobalState('data');
  const [age, setAge] = useState('');
  const [check, setCheck] = useState(false);
  const [body, setBody] = useState('Subscribed');
  useEffect(() => {
    setData(getTasks());
  }, [])
  //})
  const addTask = (name, body, age, check, datetime, iscompleted, token) => {

    checkTasks();
    const id = getTasks().length === 0 ? 0 : getTasks()[getTasks().length - 1].id + 1;
    const object = {id, name, body, age, check:check ? 'Employed' : 'Unemployed', datetime, iscompleted, token};
    const tasks = getTasks();
    tasks.push(object);
    updateTasks(tasks);
  }
  const submitTask = () =>{
    const current = new Date();
    const cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
    const cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
    const datetime = cDate + ' ' + cTime;
    if(name === '' || age === ''){
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
  //console.log(check);


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
            placeholder='Age'
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
            <input type="checkbox" checked={check} placeholder='Unemployed' 
              // value="Employed"

              onChange={(e) => setCheck(!check)}/>
            <label>
              Employed
            </label>
          </li>
          <Toaster />
          {/* <IoMdAddCircle></IoMdAddCircle> */}
          <button className='button_insert' onClick={submitTask}>Insert</button>
        </ul>
      </div>
       {data && <TasksList data={data}></TasksList>}
    </div>
  );
}
export default App;
