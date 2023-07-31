import React, { useContext, useEffect, useState } from 'react';
import { AuthenticationContext } from '../Providers/AuthenticationProvider';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Mytasks = () => {
  const notify = () => toast('Work Status Updated!');
  const { user } = useContext(AuthenticationContext);
  const [mytasks, setMytasks] = useState([]);
  const [originalTasks, setOriginalTasks] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [selectedStatusMap, setSelectedStatusMap] = useState({});

  const handleSelectChange = (event, id) => {
    const selectedStatus = event.target.value;
    setSelectedValue(selectedStatus);

    setSelectedStatusMap(prevStatusMap => ({
      ...prevStatusMap,
      [id]: selectedStatus,
    }));

    fetch(`https://server-nine-olive.vercel.app/updatestatus/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ status: selectedStatus }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount) {
          notify();
        }
      });
  };

  const fetchTasks = () => {
    fetch(`https://server-nine-olive.vercel.app/mytasks?email=${user?.email}`)
      .then(res => res.json())
      .then(data => {
        setMytasks(data);
        setOriginalTasks(data);
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleWorking = () => {
    const workings = originalTasks.filter(task => task.status === 'Working');
    setMytasks(workings);
  };

  const handleComplete = () => {
    const completes = originalTasks.filter(task => task.status === 'Complete');
    setMytasks(completes);
  };

  const handleAll = () => {
    setMytasks(originalTasks);
  };

  const handleAscending = () => {
    setSortOrder('asc');
  };

  const handleDescending = () => {
    setSortOrder('desc');
  };

  useEffect(() => {
    if (sortOrder === 'asc') {
      fetch(`https://server-nine-olive.vercel.app/mytasks?email=${user?.email}&status=asc`)
        .then(res => res.json())
        .then(data => setMytasks(data));
    } else if (sortOrder === 'desc') {
      fetch(`https://server-nine-olive.vercel.app/mytasks?email=${user?.email}&status=desc`)
        .then(res => res.json())
        .then(data => setMytasks(data));
    }
  }, [sortOrder]);

  return (
    <div className=''>
      <ToastContainer />
      <h1 className='text-center'>My Tasks</h1>
      {mytasks.length === 0 ? (
        <p className='text-center text-danger'>No task yet</p>
      ) : (
        <div className='row row-cols-1 row-cols-md-2 row-cols-lg-2 g-4'>
          <div className=' div1 mt-5'>
            <h4>
              <b>Sort by due date:</b>
            </h4>
            <div className='d-flex'>
              <button
                className='btn btn-primary btn-sm mr-2'
                onClick={handleAscending}
              >
                Ascending by due date
              </button>
              <button
                className='btn btn-primary btn-sm'
                onClick={handleDescending}
              >
                Descending by due date
              </button>
            </div>
          </div>
          <div className=' div1 mt-5'>
            <h4>
              <b>Sort by work completion:</b>
            </h4>
            <div className='d-flex'>
              <button
                className='btn btn-primary btn-sm mr-2'
                onClick={handleWorking}
              >
                Working
              </button>
              <button
                className='btn btn-primary btn-sm mr-2'
                onClick={handleComplete}
              >
                Complete
              </button>
              <button className='btn btn-primary btn-sm' onClick={handleAll}>
                All
              </button>
            </div>
          </div>
        </div>
      )}
      {mytasks.length > 0 && (
        <table className='table margin'>
          <thead>
            <tr>
              <th scope='col'>Task Name</th>
              <th scope='col'>Due Date</th>
              <th scope='col'>Assignee</th>
              <th scope='col'>Status</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {mytasks.map(task => (
              <tr key={task._id}>
                <td>{task.task_name}</td>
                <td>{task.due_date}</td>
                <td>{task.assignee}</td>
                <td>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                    value={selectedStatusMap[task._id] || ''}
                    onChange={event => handleSelectChange(event, task._id)}
                  >
                    <option disabled value=''>
                      Select Work Status
                    </option>
                    <option value='Working'>Working</option>
                    <option value='Complete'>Complete</option>
                  </select>
                </td>
                <td>
                  <Link to={`/taskdetails/${task._id}`}>
                    <button className='btn btn-primary'>View Task Details</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Mytasks;
