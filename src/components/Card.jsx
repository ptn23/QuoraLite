import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../client'
import more from './more.png'
 
const Card = ({id, title, upvotes, time, flags}) => {
    const flagStyles = {
        question: { bg: '#e0f2fe', text: '#0369a1', label: 'Question' },   
        discussion: { bg: '#fee2e2', text: '#b91c1c', label: 'Discussion' }, 
        default: { bg: '#f3f4f6', text: '#4b5563', label: 'Unidentified' } 
    };
    const currentFlag = flagStyles[flags?.toLowerCase()] || flagStyles.default;

    return (
      <div className="Card">

          <h2 className="title">{title} 
            <span 
                    style={{
                        backgroundColor: currentFlag.bg,
                        color: currentFlag.text,
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        marginLeft: '10px',
                        display: 'inline-block',
                        textTransform: 'capitalize'
                    }}
                >
                    {currentFlag.label}
                </span>
          </h2>
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