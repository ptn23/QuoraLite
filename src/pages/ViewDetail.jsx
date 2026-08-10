import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../client';
import Loading from './Loading';
import { Ratio } from 'react-bootstrap';
// import YoutubeEmbed from '../components/YoutubeEmbed';

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
    
    const getEmbedUrl = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}`: url;
};

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

            <Ratio aspectRatio="16x9">
                <iframe
                    src={getEmbedUrl(data.video_link)}
                    title="YouTube video player"
                    allowFullScreen
                    style={{ width: '100%', height: '100%', border: 'none', borderRadius: '8px' }}
                  />
            </Ratio>

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