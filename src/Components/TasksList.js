import { getTasks, completeTask, useGlobalState, getStorageToken, removeTask, editTaskContent} from "../App";
import { BsFillCalendarWeekFill } from 'react-icons/bs';
import {AiFillDelete, AiFillEdit} from 'react-icons/ai';
import {RiSave3Line} from 'react-icons/ri';
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

const TasksList = ({data}) => {
  const [jsonData, setData] = useGlobalState('data'); 
  const [editingId, setEditingId] = useState(null);
  const [editing, setEditing] = useState(false);

  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newCheck, setNewCheck] = useState('');
  const [newContent, setNewContent] = useState('');

  function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}

  return (
    <div className="container_all">
    <div className="header">
        <h4 className="header_h41"><BsFillCalendarWeekFill></BsFillCalendarWeekFill>Name</h4>
        <h4 className="header_h42">Age</h4>
        <h4 className="header_h43">Subscription</h4>
        <h4 className="header_h44">Employment</h4>
      </div>
    <div className="tasks-list" style={{ overflowY: 'scroll'}}>

      <div className="task-container">
        {data && data.map(task => {
          if(task.token === getStorageToken())
            return (
              <div className="task" key={task.id}>
                {/* <p className="small-text">Task:</p> */}
                {(!editing || task.id !== editingId ) && <h4 className="content_h41" id={"name-" + task.id}>{
                  newName === "" ? task.name : (editing && task.id === editingId ? newName : task.name)
                }</h4>}
                {editing && task.id === editingId && <input type="text" value={newName} onChange={(e) => {
                  setNewName(e.target.value);
                }}></input>}

                {(!editing || task.id !== editingId ) && <h4 className="content_h42" id={"age-" + task.id}>{
                  newAge === "" ? task.age : (editing && task.id === editingId ? newAge : task.age)
                }</h4>}
                {editing && task.id === editingId && <input type="number" value={newAge} onChange={(e) => {
                  setNewAge(e.target.value);
                }}></input>}

                {(!editing || task.id !== editingId ) && <h4 className="content_h43" id={"content-" + task.id}>{task.body}</h4>}
                {editing && task.id === editingId && <textarea className="task-newcontent" value={newContent} onChange={(e) => {
                  setNewContent(e.target.value);
                }}></textarea>}

                {(!editing || task.id !== editingId ) && <h4 className="content_h44" id={"age-" + task.id}>{
                  newCheck === "" ? task.check : (editing && task.id === editingId ? newCheck : task.check)
                }</h4>}
                {editing && task.id === editingId && <input type="text" value={newCheck} onChange={(e) => {
                  setNewCheck(e.target.value);
                }}></input>}
                {/* <p>{task.datetime}</p> */}
                
                {(!editing || task.id !== editingId ) && <button onClick={() => {setEditingId(task.id);setEditing(!editing); setNewName(task.name); setNewContent(task.body)}}><AiFillEdit></AiFillEdit> Edit</button>}

                {editing && task.id === editingId && <button onClick={() => {
                  if(isEmptyOrSpaces(newContent) ||isEmptyOrSpaces(newName)){
                    toast.error('Fill the blank fields');
                  }else{
                    editTaskContent(task.id, newContent, newName);
                    setEditingId(null);
                    setEditing(!editing);
                    setData(getTasks());
                  }
                }}><RiSave3Line></RiSave3Line> Save</button>}

                <button className="delete-btn" onClick={() => {removeTask(task.id); setData(getTasks()); toast.success('Successfully deleted');}}> <AiFillDelete></AiFillDelete>Delete</button>
              </div>
            );
        })}
      </div>
    </div>
  </div>
  );
}
 
export default TasksList;