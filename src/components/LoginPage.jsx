import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
const LoginPage = ({setUser}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    axios.post(`${process.env.REACT_APP_API_URL}/users/signIn`, {
      emailId: email,
      password
    }).then((res)=>{
      setUser(res.data.data._id)
      localStorage.setItem("userId", res.data.data._id)
      navigate("/productsList")
    }).catch((err)=>{
      console.log(err)
      setError(err.response.data.error)
    })
  }
  return (

    <div className='align-vertical page-center-align'>
      <h3>Sign In</h3>
      <div>
        <label class="form-label" for="email">Email</label>
        <input class="form-control" value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="youremail@gmail.com" id='email' name='email'></input>
      </div>
      <div>
        <label class="form-label" for="password">Password</label>
        <input class="form-control" value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="**********" id='password' name='password'></input>
      </div>
      {
        error && <div className='error'>{error}</div>
      }
      <div>
        <button className='btn btn-primary' type='Submit' onClick={handleSubmit}>Log in</button>
      </div>
      <div>
      Don't have an account?<Link to="/UserRegistrationForm"> Register here.</Link>
      </div>
    </div>

  )
}
export default LoginPage;