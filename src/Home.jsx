import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'
import {BsCircleFill, BsFillCheckCircleFill} from "react-icons/bs"
import {BsFillTrashFill} from "react-icons/bs"
import "./App.css"

function Home() {

    const [todos,setTodos]=useState([])
    useEffect(()=>{
        axios.get("http://localhost:3001/get")
        .then(result=>setTodos(result.data))
        .catch(err=>console.log(err))
    },[])

    const handleEdit=(id)=>{
        axios.put("http://localhost:3001/update/"+id)
        .then(result=>{
            location.reload()
        })
        .catch(err=>console.log(err))
    }

    const handleDelete=(id)=>{
        axios.delete("http://localhost:3001/delete/"+id)
        .then(result=>{
            location.reload()
        })
        .catch(err=>console.log(err))
    }

  return (
    // style={{width:"700px",border:"1px solid black",marginTop:"300px"}}
    <div className='home'>
        <h2>Todo List</h2>
        <Create />
        {
            todos.length===0 
            ?
            <div><h2>No Record</h2></div>
            :
            todos.map(todo=>{
            return <div key={Math.random()*100} className='task' style={{width:"360px"}}>
                <div className="checkbox" onClick={()=>handleEdit(todo._id)}>
                    {todo.done ?
                     <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
                     :
                     <BsCircleFill className='icon'/>
                     }
                   
                    <p className={todo.done ? "line_through" : "" }>{todo.task}</p>
                     
                </div>
            <div>
                <span><BsFillTrashFill className="icon" onClick={()=>handleDelete(todo._id)} /></span>
            </div>
            </div>
            })
        }
    </div>
  )
}

export default Home