import React, { useContext, useState } from 'react';
import './Register.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthenticationContext, auth } from '../Providers/AuthenticationProvider';
import { updateProfile } from 'firebase/auth';
import registerimg from '../../assets/registration.webp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Register = () => {
    const notify = () => toast("User Added!");
  const [success,setSuccess]=useState('');
  const [error,setError]=useState('');
  const {registerUser}=useContext(AuthenticationContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/'


const handleRegister=(event)=>{

  event.preventDefault();
  const form=event.target;
  const name=form.name.value;
  const email=form.email.value;
  const password=form.password.value;
  const confirmPassword=form.confirmPassword.value;
  

  if(password!==confirmPassword){
    setError('Password do not match');
    return;
  }

  if(password.length<6){
      setError('Password should be six characters long!');
      return;
  }
  if(!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"|,.<>/?]).{6,}$/.test(password)){
    setError("Please enter atleast one special characters and one upper case!")
    return;
  }
  registerUser(email,password).then(result=>{
    const newUser=result.user;
    updateProfile(auth.currentUser, {
      displayName: name
    }).then(() => {
      setError('');
      setSuccess('User has been registered successfully!Now please login to continue.')
      fetch('https://server-nine-olive.vercel.app/adduser',{
        method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify({name,email,role:'employee'})
      }).then(res => res.json())
      .then(data => {
          if (data.insertedId) {
              form.reset();
            notify();
              
          }
      })
    }).catch((error) => {
      
    });
    console.log(newUser);
  }).catch(error=>setError(error.message))
  form.reset();

 

}
     





    return (
   <div className="container">
    <ToastContainer />
    <div className="row">
        <div className="col-md-6 mt-5 mb-5">
<img className='registerimg' src={registerimg} alt="" />
        </div>
    <div className='formpage w-50 mx-auto mt-5 mb-5 col-md-6'>
          <p className='text-danger text-center'>{error}</p>
          <p className='text-success text-center'>{success}</p>
            <h1 className='text-center'>Please Register</h1>
            <form className='w-50 mx-auto' onSubmit={handleRegister}>
  <div class="form-group mb-3">
    <label for="exampleInputEmail1">Name:</label>
    <input type="text" class="form-control" id="exampleInputEmail1" name='name' aria-describedby="emailHelp" placeholder="Enter your name" required/>
   
  </div>
  <div class="form-group mb-3">
    <label for="exampleInputEmail1">Email address:</label>
    <input type="email" class="form-control" id="exampleInputEmail1" name='email' aria-describedby="emailHelp" placeholder="Enter email" required/>
    
  </div>
  <div class="form-group mb-3">
    <label for="exampleInputPassword1">Password:</label>
    <input type="password" class="form-control" id="exampleInputPassword1" name='password' placeholder="Password" required/>
  </div>
  <div class="form-group mb-3">
    <label for="exampleInputPassword1">Confirm Password:</label>
    <input type="password" class="form-control" id="exampleInputPassword1" name='confirmPassword' placeholder="Confirm Password" required/>
  </div>
 



  <p>Already have an account?Please <Link className='register' to='/login'>Login</Link></p>
  
  <button type="submit" class="btn btn-danger">Register</button>
</form>
        </div>
    </div>
   </div>
    );
};

export default Register;