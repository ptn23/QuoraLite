import { useState } from 'react'
import React from 'react';
import { useRoutes, Link } from 'react-router-dom'
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import ReadPosts from './pages/ReadPosts';
import ViewDetail from './pages/ViewDetail';
import './App.css'
function App() {

  const [sortBy, setSortBy] = useState('created_at')
  const [search, setSearch] = useState('')
  const [flag, setFlag] = useState('')  

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
    }
  ]);

  return (
    <>
      <div className="App">
      <div className="header">


        <h1>All Your Questions</h1>

        <div>
          <label htmlFor='sortBy'>
            Sort by:
            <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className='sort-select'>
              <option value=''></option>
              <option value='created_at'>Created At</option>
              <option value='upvotes'> Upvotes</option>
            </select>
          </label>
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

        <Link to="/"><button className="headerBtn"> Home  </button></Link>
        <Link to="/new"><button className="headerBtn"> Create New Posts </button></Link>
        </div>
        {element}
    </div>
    </>
  )
}

export default App
