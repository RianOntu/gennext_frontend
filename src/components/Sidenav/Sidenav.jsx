import React, { useContext, useEffect, useState } from 'react';
import './Sidenav.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { AuthenticationContext } from '../Providers/AuthenticationProvider';
import { Link, useNavigate } from 'react-router-dom';

const Sidenav = () => {
  const {logOut,user}=useContext(AuthenticationContext);
  const navigate = useNavigate()
  const from ='/login';
  const [role,setRole]=useState('');
  
  useEffect(() => {
    if (user) {
      fetch(`https://server-nine-olive.vercel.app/userrole?email=${user.email}`)
        .then(res => res.json())
        .then(data => setRole(data[0].role))
        .catch(error => {
          // Handle any error that occurred during the fetch request
          console.error('Error fetching user role:', error);
        });
    }
  }, [user]);
  const handleLogout=()=>{
    logOut().then(()=>navigate(from, { replace: true })).catch(error=>console.log(error))
  }
  let li;
  if(role=='employee'){
      li = (
          <>
            
            <Link to='/'>Home</Link>
            <Link to='/mytasks'>My Tasks</Link>
            <Link to='/logout' onClick={handleLogout}>Logout</Link>
          </>
        );
  }else if(role=='manager'){
    li = (
      <>
        
        <Link to='/'>Home</Link>
        <Link to='/addtask'>Add Task</Link>
        <Link to='/alltasks'>All Tasks</Link>
        <Link to='/logout' onClick={handleLogout}>Logout</Link>
      </>
    );
  }
    return (
        <div style={{ height: '100vh' }}>
        <Navbar bg="light" expand="lg" style={{ height: '100%' }}>
          <Container style={{marginBottom:'auto'}}>
            <Navbar.Toggle aria-controls="responsive-side-nav" />
            <Navbar.Collapse id="responsive-side-nav">
              <Nav className="me-auto mb-auto flex-column" style={{ height: '100%' }}>
                {li}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
};

export default Sidenav;