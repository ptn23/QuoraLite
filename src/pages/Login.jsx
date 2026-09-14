import React, {useState} from 'react';
import {supabase} from '../client'
import {Link} from 'react-router-dom'
import './Login.css';
import PropTypes from 'prop-types';

// async function loginUser(credentials) {
//   return fetch('http://localhost:8080/login', {
//    method: 'POST',
//    headers: {
//      'Content-Type': 'application/json'
//    },
//    body: JSON.stringify(credentials)
//  })
//    .then(data => data.json())
// }


export default function Login({setToken}) {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  
  const handleSubmit = async e => {
    e.preventDefault();
    const {data, error} = await supabase.from('users').select('*').eq('email', email).eq('password', password).single();
    if (error){
      alert('Login failed')
    }
    else{
      setToken(data.session)
    }
  }


  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="text"
          onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" 
          onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <p className="signup-prompt">
        Don't have an account? <Link to="/signup" className="signup-link">Sign up</Link>
      </p>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}