import React from 'react';
import { useLoaderData } from 'react-router-dom';

const AllTasks = () => {
      const alltasks=useLoaderData();
      
    return (
        <div>
            <h1 className='text-center'>All Tasks</h1>
            <table className="table mt-5">
  <thead>
    <tr>
      <th scope="col">Task Name</th>
      <th scope="col">Due Date</th>
      <th scope="col">Assignee</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    {
        alltasks.map(task=><tr>
            <td>{task.task_name}</td>
              <td>{task.due_date}</td>
              <td>{task.assignee}</td>
              <td>{task.status}</td>
            </tr>)
    }
    
    
  </tbody>
</table>
        </div>
    );
};

export default AllTasks;