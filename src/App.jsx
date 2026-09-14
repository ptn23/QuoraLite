import { useEffect, useState } from 'react'
import React from 'react';
import { useRoutes, Link } from 'react-router-dom'
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import ReadPosts from './pages/ReadPosts';
import ViewDetail from './pages/ViewDetail';
import './App.css'
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {

  const [sortBy, setSortBy] = useState('created_at')
  const [search, setSearch] = useState('')
  const [flag, setFlag] = useState('')  
  const [mode, setMode] = useState('Dark')
  
  const [login, setLogin] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true'
  })

  useEffect(() => {
    localStorage.getItem('isLoggedIn', login)
  }, [login])

  const handleLogin = (session) =>{
    setLogin(true);
  }

  const handleLogout = () =>{
    setLogin(false);
    localStorage.removeItem('isLoggedIn');
  }
  
  let element = useRoutes([
    {
      path: "/",
      element: login ? 
      (<ReadPosts sortBy={sortBy} search={search} flags={flag}/>) :
      (<LoginView onLogin={handleLogin}/>)
    },
    {
      path:"/edit/:id",
      element: login?
      (<EditPost />):
      (<LoginView onLogin={handleLogin}/>)
    },
    {
      path:"/new",
      element: login? 
      (<CreatePost />) : 
      (<LoginView onLogin={handleLogin}/>)
    },
    {
      path:"/detail/:id",
      element: <ViewDetail/>
    },
    {
      path: "/signup",
      element: <SignUp/>
    }
  ]);

  function LoginView() {
  return <Login setToken={handleLogin}/>
}

  return (
    <>
      <div className="App" data-theme={mode}>
        {
          login ? (
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
        <button className="headerBtn" onClick={() => setLogin(false)}>Sign Out</button>
        </div>
        ) : null}
        {element}
    </div>
    </>
  )
}

export default App
