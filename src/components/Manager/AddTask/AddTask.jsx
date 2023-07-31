import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTask = () => {
    const notify = () => toast("Task Added!");
    const [allusers,setAllusers]=useState([]);
    const [Employees,setEmployess]=useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
      };
      
    const handleAddTask=(event)=>{
      event.preventDefault();
      const form=event.target;
      const task_name=form.task_name.value;
      const task_desc=form.task_desc.value;
      const due_date=form.due_date.value;
      const assignee=selectedValue;

      console.log(selectedValue);
     fetch(`https://server-nine-olive.vercel.app/addtask?email=${encodeURIComponent(assignee)}`,{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({task_name,task_desc,due_date,assignee,status:'In Progress'})

     }).then(res=>res.json()).then(data => {
        if (data.insertedId) {
            form.reset();
          notify();
            
        }
    }).catch((error) => {
      
    });

    }
    useEffect(()=>{
           fetch('https://server-nine-olive.vercel.app/allusers')
           .then(res=>res.json())
           .then(data=>setAllusers(data))
    },[])
    useEffect(()=>{
        const onlyEmployees=allusers.filter(user=>user.role!='manager')
        setEmployess(onlyEmployees)
    },[allusers])
    
    return (
        <div>
            <ToastContainer />
            <form className='w-50 mx-auto mt-5 mb-5' onSubmit={handleAddTask}>
                <h1 className='text-center'>Add Task</h1>
            <div class="form-group mb-3">
    <label for="exampleInputEmail1">Task Name: </label>
    <input type="text" class="form-control" id="exampleInputEmail1" name='task_name' aria-describedby="emailHelp" placeholder="Enter task name" required/>
   
  </div>
  <div class="form-group mb-3">
    <label for="exampleInputEmail1">Task Description: </label>
    <textarea type="text" class="form-control" id="exampleInputEmail1" name='task_desc' aria-describedby="emailHelp" placeholder="Enter task description" required/>

   
  </div>
  <div class="form-group mb-3">
    <label for="exampleInputEmail1">Due Date: </label>
    <input type="date" class="form-control" id="exampleInputEmail1" name='due_date' aria-describedby="emailHelp" placeholder="Enter task name" required/>
   
  </div>
  <div>
    <br />
    <label htmlFor="">Select Asignee:</label>
  <select className="form-select" aria-label="Default select example" value={selectedValue} onChange={handleSelectChange}>
  <option value="">Select an employee</option>
{
    Employees.map(employee=><option value={employee.email}>{employee.email}</option>)
}
  
  
</select>
  </div>
  <br />
<input className='btn btn-primary w-100' type="submit" value="Add Task" />
  
            </form>
            
        </div>
    );
};

export default AddTask;