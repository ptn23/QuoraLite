import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../client';
import Loading from './Loading';

const ViewDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');

    useEffect(() => {
        const getDetail = async () => {
            setLoading(true);
            const { data: fetchedData, error } = await supabase.from('mini-quora').select().eq("id", id).single();
            if (error) {
                console.error("Error fetching detail:", error);
            } else {
                setData(fetchedData);
            }
            setLoading(false);
        };
        getDetail();
    }, [id]);

    const updateUpvotes = async (event) => {
        event.preventDefault();
        if (!data) return;
        const count = data.upvotes +1;
        setData((prev) => ({ ...prev, upvotes: count }));
        const { error } = await supabase.from('mini-quora').update({ upvotes: count }).eq('id', id);
        if (error) {
            console.error("Failed to update upvotes:", error);
            setData((prev) => ({ ...prev, upvotes: data.upvotes }));
        }
    };

    const handleAddComment = async (event) => {
        event.preventDefault();
        if (!comment.trim() || !data) return;
        const updatedComments = [...(data.comments || []), comment.trim()];
        setData((prev) => ({...prev, comments: updatedComments}));
        setComment('');
        const {error} = await supabase.from('mini-quora').update({comments: updatedComments}).eq('id', id);
        if (error) {
            console.error("Failed to add comment:", error);
            setData((prev) => ({ ...prev, comments: data.comments }));
        }
    }

    const deletePost = async(event)=> {
        event.preventDefault();
        await supabase.from('mini-quora').delete().eq('id', id);
        window.location = "/";
    }

    if (loading) return <Loading />;
    if (!data) return <h2>Post not found!</h2>;

    return (
        <div className="detail">
            <h2>{data.title}</h2>
            <p>{data.content}</p>
            
            {(data.image_url) && (
                <div className="detail-image-container">
                    <img 
                        src={data.image_url} 
                        alt={data.title} 
                        style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', margin: '15px 0' }}
                    />
                </div>
            )}

            <p>Created at: {new Date(data.created_at).toLocaleString()}</p>
            
            <button className="betButton" onClick={updateUpvotes}>
                👍 {data.upvotes}
            </button>
            <br />

            <Link to={'/edit/'+ id}>
                <button className="moreButton" alt="edit button" >Edit</button>
            </Link>
            <button className="deleteButton" onClick={deletePost}>Delete</button>


            <div className="comments-section">
                <h3>Comments</h3>
                <form onSubmit={handleAddComment}>
                    <input
                    type="text"
                    placeholder="Leave a comment here..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    style={{ width: '70%', padding: '8px', marginRight: '8px' }}
                    />
                    <button type="submit">Post Comment</button>
                </form>

                <div className="comments-list" style={{ marginTop: '15px', textAlign: 'left' }}>
                    {data.comments && data.comments.length > 0 ? (
                        data.comments.map((comment, index) => (
                            <div key={index} className="comment-box" >
                                {comment}
                            </div>
                        ))

                    ) : (
                        <p> No comments yet.</p>
                    )}
                </div>

            </div>
            <Link to="/" className="returnButton">Return</Link>
        </div>
    );
};

export default ViewDetail;