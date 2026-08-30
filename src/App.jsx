import { useState } from 'react'
import React from 'react';
import { useRoutes, Link } from 'react-router-dom'
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import ReadPosts from './pages/ReadPosts';
import ViewDetail from './pages/ViewDetail';
import './App.css'
import Login from './pages/Login';
import SocialLogin from "./components/SocialLogin";
import InputField from "./components/InputField";
import SignUp from './pages/SignUp';

function App() {

  const [sortBy, setSortBy] = useState('created_at')
  const [search, setSearch] = useState('')
  const [flag, setFlag] = useState('')  
  const [mode, setMode] = useState('Dark')
  //const [token, setToken] = useState()
  const [login, setLogin] = useState(false)

  const handleLogin = (e) =>{
    e.preventDefault();
    setLogin(true);
  }
  
  let element = useRoutes([
    {
      path: "/",
      element:<ReadPosts 
      sortBy={sortBy}
      search={search} 
      flags={flag}/>
    },
    {
      path:"/edit/:id",
      element: <EditPost />
    },
    {
      path:"/new",
      element: <CreatePost />
    },
    {
      path:"/detail/:id",
      element: <ViewDetail/>
    },
  ]);

  if (!login){
    return (
    <div className="login-container">
      <h2 className="form-title">Log in with</h2>
      <SocialLogin />
      <p className="separator"><span>or</span></p>
      <form action="#" className="login-form" onSubmit={handleLogin}>
        <InputField type="email" placeholder="Email address" icon="mail" />
        <InputField type="password" placeholder="Password" icon="lock" />
        <a href="#" className="forgot-password-link">Forgot password?</a>
        <button type="submit" className="login-button">Log In</button>
      </form>
      <p className="signup-prompt">
        Dont have an account? 
        {/* <Link to="/signup" className="signup-link">Sign up</Link> */}
      </p>
    </div>
    )
  }

  return (
    <>
      <div className="App" data-theme={mode}>
      <div className="header">
        <h1>QuoraLite</h1>

        <div className="sort-container">
          <span className="sort-label">Sort by:</span>
          <button
          type="button"
          className={`sort-btn ${sortBy === 'created_at' ? 'active' : ''}`}
          onClick={() => setSortBy('created_at')}
          >
          Created At
          </button>

          <button
          type="button"
          className={`sort-btn ${sortBy === 'upvotes' ? 'active' : ''}`}
          onClick={() => setSortBy('upvotes')}
          >
          Upvotes
          </button>
        </div>

        <div>
          <label>
            Filter by flags:
            <select
            value={flag}
            onChange={(e) => setFlag(e.target.value)}
            className='sort-flag'>
              <option value=''></option>
              <option value='question'>Question</option>
              <option value='discussion'>Discussion</option>
              <option value='unidentified'>Unidentified</option>
            </select>
          </label>
        </div>

        <div>
          <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="searchInput"
          />
        </div>

        <div>
          <label>
            Choose a mode
            <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className='theme-select'>
              <option value='Dark'> Dark </option>
              <option value='Light'> Light </option>
            </select>
          </label>
        </div>

        <Link to="/"><button className="headerBtn"> Home  </button></Link>
        <Link to="/new"><button className="headerBtn"> Create New Posts </button></Link>
        </div>
        {element}
    </div>
    </>
  )
}

export default App
