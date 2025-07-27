import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import HomeButton from '../components/HomeButton.jsx';
import UserButton from "../components/UserButton.jsx";

function ActivityComment(comment){
    let c = comment.text.split("$&");
    return (
        <div className="activity-comment">
            <div className="activity-comment-author">{c[0]}</div>
            <div className="activity-comment-text">{c[1]}</div>
        </div>
    );
}
function ActivityPage() {
    const [user, setUser] = useState({});
    const [activity, setActivity] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    const API_BASE_URL = `http://localhost:3001`;

    const fetchActivity = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/activities/${id}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`请求失败: ${response.status}`);
            }

            const data = await response.json();
            setActivity(data);
        } catch (err) {
            console.error(err);
        }
    }

    const fetchComments = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/comments/${id}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`请求失败: ${response.status}`);
            }

            const data = await response.json();
            setComments(data);
        } catch (err) {
            console.error(err);
        }
    };

    const createComment = async () => {
        let uid = user.id;
        let aid = activity.id;
        let c = user.name + "$&" + newComment;

        if (newComment === null || newComment.trim() === '') {
            setError('请填写完整');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({uid, aid, c})
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || '创建评论失败');
            }

            const createdComment = await response.json();
            setComments([...comments, createdComment]);
            setNewComment('');
            setError('');
        } catch (err) {
            setError(`创建失败: ${err.message}`);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setUser(localStorage.getItem("user"));
        fetchActivity();
        fetchComments();
    },[]);

    return (
        <>
            <div>
                <HomeButton/>
                <UserButton/>
            </div>
            <div>
                <h2>{activity.name}</h2>
                <p>{activity.description}</p>
            </div>
            <div>
                {comments.map(comment => (
                    <ActivityComment key={comment.id} comment={comment}/>
                ))}
            </div>
            <div>
                <div>
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="留下你的评论吧"
                    />
                </div>
                <button onClick={createComment} disabled={loading}>
                    {loading ? '提交中...' : '添加评论'}
                </button>
            </div>
        </>
    );
}

export default ActivityPage;