import {useState} from 'react'
import { useParams } from 'react-router-dom'
import './EditPost.css'
import { supabase } from '../client'

const EditPost = () => {

    const {id} = useParams()
    const [post, setPost] = useState({id: null, title: "", content: "", image_url: ""})

    const handleChange = (event) => {
        const {name, value} = event.target
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const updatePost = async(event) => {
        event.preventDefault();
        if (!post.title.trim()) {
            alert("Please enter a post title before submitting!");
            return;
        }
        await supabase.from('mini-quora').update({
            title: post.title,
            content: post.content,
            image_url: post.image_url
        }).eq( 'id', id);
        window.location = "/";
    }

    const deletePost = async(event)=> {
        event.preventDefault();
        await supabase.from('mini-quora').delete().eq('id', id);
        window.location = "/";
    }

    return (
        <div>
            <form>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} required/>
                <br/>

                <label htmlFor="content">Content</label><br />
                <textarea rows="5" cols="50" id="content" name="content" value={post.content} onChange={handleChange}/>
                <br/>

                <label htmlFor="image_url">Image</label><br />
                <input 
                type="url" 
                id="image_url" 
                name="image_url" 
                placeholder="https://example.com"
                value={post.image_url} 
                onChange={handleChange} 
                />

                <input type="submit" value="Submit" onClick={updatePost}/>
                <button className="deleteButton" onClick={deletePost}>Delete</button>
            </form>

            
        </div>
    )
}

export default EditPost