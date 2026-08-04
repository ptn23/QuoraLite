import {useState} from 'react'
import './CreatePost.css'
import { supabase } from '../client'
const CreatePost = () => {
    const [post, setPost] = useState({
        'title': '',
        'content': '',
        'image_url': ''
        
    })

    const [select, setSelect] = useState("");

    const handleChange = (event) => {
        const {name, value} = event.target
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
        setSelect(event.target.value);
    }

    const createPost = async (event) => {
        event.preventDefault();
        if (!post.title.trim()) {
            alert("Please enter a post title before submitting!");
            return;
        }
        await supabase.from('mini-quora').insert({
            title: post.title,
            content: post.content,
            image_url: post.image_url
        }).select();
        window.location = "/";
    }

    return (
        <div>
            <form>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" onChange={handleChange} required/><br />
                <br/>

                <label htmlFor="content">Content</label><br />
                <textarea rows="5" cols="50" id="description" name="description" onChange={handleChange} >
                </textarea>
                <br/>

                <label htmlFor="image_url">URL Link</label><br />
                <input 
                type="url" 
                id="image_url" 
                name="image_url" 
                placeholder="https://example.com"
                value={post.image_url} 
                onChange={handleChange} 
                />
                <br/>


                <input type="submit" value="Submit" onClick={createPost} />
            </form>
        </div>
    )
}
export default CreatePost;