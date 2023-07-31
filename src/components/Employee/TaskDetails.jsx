import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthenticationContext } from '../Providers/AuthenticationProvider';
import moment from 'moment';
import './TaskDetails.css';

const TaskDetails = () => {
    const currentDate = moment().format('YYYY-MM-DD');
    const mytask=useLoaderData();
    const {user}=useContext(AuthenticationContext);
    const [commentArr, setCommentArr] = useState([]);
  const handleComment=(event)=>{
    event.preventDefault();
    const form=event.target;
    const name=user?.displayName;
    const comment=form.comment.value;

   
    const commentObj={name,comment,date:currentDate};
    setCommentArr((prevComments) => [...prevComments, commentObj]);
    form.reset();
  }

   
    return (
        <div className='container'>
            {
                mytask.map(task=><><h3>Task Name : {task.task_name}</h3>
                <p>Due Date : {task.due_date}</p>
                <p>Task Description : {task.task_desc}</p></>)
            }
            {
                commentArr.map(comment=><><h4><b>{comment.name}</b></h4><p>{comment.date}</p><p>{comment.comment}</p></>)
            }

           <form className='w-50' onSubmit={handleComment}>
             <label htmlFor="">Your Name:</label>
             <input type="text" name="" id="" readOnly value={user?.displayName} /><br />
             <label htmlFor="">Your Comment:</label><br />
             <textarea name="comment" id="" cols="30" rows="10" placeholder='Enter your comment'></textarea><br />
              <input type="submit" value="Submit" className='btn btn-primary w-100' />


           </form>
            
        </div>
    );
};

export default TaskDetails;