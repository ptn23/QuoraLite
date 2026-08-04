import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../client'
import more from './more.png'
 
const Card = ({id, title, upvotes, time}) => {
    return (
      <div className="Card">

          <h2 className="title">{title} </h2>
          <h3>Created at: {new Date(time).toLocaleString()}</h3>

            <Link to={'edit/'+ id}>
                <button className="moreButton" alt="edit button" >Edit</button>
            </Link>
            <Link to={'detail/'+id}>
                <button className="moreButton" alt="edit button" >View Detail</button>
            </Link>
          <h4 className="upvotes">👍{upvotes}</h4>
      </div>
  );
}
export default Card;