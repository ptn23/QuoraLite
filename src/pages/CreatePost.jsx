import {useState} from 'react'
import './CreatePost.css'
import { supabase } from '../client'
const CreatePost = () => {
    const [post, setPost] = useState({
        'title': '',
        'content': '',
        'image_url': '',
        'flags': 'unidentified',
        'video_link': ''
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
            image_url: post.image_url,
            flags: post.flags,
            video_link: post.video_link
        }).select();
        window.location = "/";
    }

    return (
        <div>
            <form>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" value={post.title}onChange={handleChange} required/><br />
                <br/>

                <label htmlFor="content">Content</label><br />
                <textarea rows="5" cols="50" id="content" name="content" value={post.content}onChange={handleChange} >
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

                <label htmlFor="flags"> Pick a flag for the question
                    <select
                    id="flags"
                    name="flags"
                    value={post.flags}
                    onChange={handleChange}
                    className="flags"
                    >
                    <option value='unidentified'>Unidentified</option>
                    <option value='question'> Question </option>
                    <option value='discussion'> Discussion </option>
                    </select>
                </label>
                <br/>
                <label htmlFor="video_link">Video Link</label><br />
                <input 
                type="url" 
                id="video_link" 
                name="video_link" 
                placeholder="https://example.com"
                value={post.video_link} 
                onChange={handleChange} 
                />
                <br/>
                

                <br/>
                <input type="submit" value="Submit" onClick={createPost} />
            </form>
        </div>
    )
}
export default CreatePost;