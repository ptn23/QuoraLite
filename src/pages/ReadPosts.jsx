import { useState, useEffect } from 'react'
import Card from '../components/Card'
import { supabase } from '../client'
import Loading from './Loading'
const ReadPosts = ({sortBy, search}) => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
    const fetchPost = async () => {
        setLoading(true);
        const { data } = await supabase.from('mini-quora').select().order('created_at', { ascending: false })
            setPosts(data)
            setLoading(false);
        }
        fetchPost()
    }, [])

    const filteredPosts = posts ? [...posts].filter((post) => {
        if (!search) return true;
        return post.title.toLowerCase().includes(search.toLowerCase());
    }) : [];

    const sortedPosts = posts ? [...filteredPosts].sort((a, b) => {
        if (sortBy === 'upvotes') {
            return (b.upvotes || 0) - (a.upvotes || 0);
        } 
        else {
            return new Date(b.created_at) - new Date(a.created_at);
        }
    }) : [];

    if (loading) return <Loading />;
    return (
        <div className="ReadPosts">
            {
                sortedPosts && sortedPosts.length > 0 ?
                sortedPosts.map((post) => 
                    <Card 
                        key={post.id}
                        id={post.id} 
                        title={post.title}
                        upvotes={post.upvotes}
                        time={post.created_at}
                    />
                ) : <h2>{'No Questions Yet!'}</h2>
            }
        </div>  
    )
}
export default ReadPosts;