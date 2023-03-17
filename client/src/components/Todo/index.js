import React,{useEffect,useState} from 'react'
import axios from 'axios'
import "./index.css"
const Todo = () => {
 const [data,setData]=useState([])
 const [item,setItem]=useState("")
    useEffect(()=>{
         axios.get("http://localhost:7000/gettask").then(
            arr=>setData(arr.data)
         )
    },[])

    const SubmitHandler=(event)=>{
        event.preventDefault()
        axios.post("http://localhost:7000/addtask",{todo:item}).then(
            arr=>setData(arr.data)
        )
    }

    const onDelete=(id)=>{
     axios.delete(`http://localhost:7000/delete/${id}`).then(
        arr=>setData(arr.data)
     )
    }

  return (
    <div className='container'>
        <h1 className='heading'>My Tasks</h1>
        <form onSubmit={SubmitHandler}>
        <input type="text" className='input' value={item} onChange={(event)=>setItem(event.target.value)}/>
        <input className="add" type="submit" value="Add"/>
        </form>
        <ul>
            {data.map(each=>
                <div className='listcontainer' key={each._id}>
                    <h1 className='todo'>{each.todo}</h1>
                    <button type="button" className='button' onClick={()=>onDelete(each._id)}>Delete</button>
                </div>)}
        </ul>
    </div>
  )
}

export default Todo