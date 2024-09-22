import React, { useState } from 'react';
import Navbar from '../../Component/Navbar/Navbar';
import './SignUp.css';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';

const SignUp = () => {

  const { register, handleSubmit,reset, formState:{errors}} = useForm();
  const [show, setShow] = useState(true)
  const [serverResponse, setServerResponse] = useState('')

  const submitForm = (data) => {
    if(data.password === data.confirmPassword){

      const body={
        username:data.username,
        email:data.email,
        password:data.password
      }
      const requestOptions={
        method:"POST",
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify(body)
      }

      fetch('http://localhost:5000/auth/signup',requestOptions)
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
        setServerResponse(data.message)
        console.log(serverResponse)

        setShow(true)
      })
      .catch(err=>console.log(err))

      reset()
    }
    else{
      alert("Passwords do not match")
    }
  }



  return (
    <>
    <Navbar/>
    <div className="signup">
      <div className="signup-form">
        

        {show?
          <>
            <Alert className="mt-5" variant="success" onClose={() => setShow(false)} dismissible>
              <p>
                {serverResponse}
              </p>
            </Alert>
            <h1 className="text-uppercase mt-1">SignUp</h1>
            </>
            :
            <h1 className="text-uppercase">SignUp</h1>
        }

        <form action="form" className="form">
          <label htmlFor="username" className="text-black-50">Username*</label>
          <input type="text" className="username"
            {...register("username", { required: true, maxLength: 25})}
          />
          {errors.username && <p><small style={{color:'red'}}>Username is required</small></p>}
          {errors.username?.type==="maxLength"&&<p><small style={{color:'red'}}>Max characters should be 25</small></p>}
          
          <label htmlFor="email" className="text-black-50">Email*</label>
          <input type="email" className="email"
            {...register("email", { required: true, maxLength: 80})}
          />
          {errors.email && <p><small style={{color:'red'}}>Email is required</small></p>}
          {errors.email?.type==="maxLength"&&<p><small style={{color:'red'}}>Max characters should be 80</small></p>}
          
          <label htmlFor="password" className="text-black-50">Password*</label>
          <input type="password" className="password"
            {...register("password", { required: true, minLength: 8})}
          />
          {errors.password && <p><small style={{color:'red'}}>Password is required</small></p>}
          {errors.password?.type==="minLength"&&<p><small style={{color:'red'}}>Min characters should be 8</small></p>}

          <label htmlFor="confirmPassword" className="text-black-50">confirm Password*</label>
          <input type="password" className="confirmPassword"
            {...register("confirmPassword", { required: true, minLength: 8})}
          />
          {errors.confirmPassword && <p><small style={{color:'red'}}>Confirm Password is required</small></p>}
          {errors.confirmPassword?.type==="minLength"&&<p><small style={{color:'red'}}>Min characters should be 8</small></p>}


          <button className="signup-btn m-3" onClick={handleSubmit(submitForm)}>SignUp</button>
          <p>Already have an account ! <Link to="/login">Log In here</Link>.</p>
        </form>
      </div>
    </div>
    </>
  );
};

export default SignUp;
