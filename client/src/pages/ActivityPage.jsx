import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import HomeButton from '../components/HomeButton.jsx';
import UserButton from "../components/UserButton.jsx";
import { Container, Card, Form, Button, Spinner } from 'react-bootstrap';
function ActivityComment({comment}){
    const c = String(comment.text).split('$&');
    return (
        <div className="activity-comment">
            <p className="activity-comment-author">{c[0]}</p>
            <p className="activity-comment-text">{c[1]}</p>
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

    // 获取活动信息
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

    // 获取评论信息
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

    // 创建评论
    const createComment = async () => {
        let uid = user.id;
        let aid = activity.id;
        let c = user.name + "$&" + newComment;
        const data = {
            uid : uid,
            aid : aid,
            c : c
        };

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
                body: JSON.stringify(data)
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
        setUser(JSON.parse(localStorage.getItem("user")));
        fetchActivity();
        fetchComments();
    },[]);

    return (
        <Container>
            <div className="d-flex justify-content-between mb-4">
                <HomeButton />
                <UserButton />
            </div>

            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>{activity.name}</Card.Title>
                    <Card.Text>{activity.detail}</Card.Text>
                </Card.Body>
            </Card>

            <div className="mb-4">
                <h4>评论</h4>
                {comments.map(comment => (
                    <Card key={comment.id} className="mb-2">
                        <Card.Body>
                            <Card.Subtitle className="mb-1 text-muted">{(String(comment.text).split('$&'))[0]}</Card.Subtitle>
                            <Card.Text>{(String(comment.text).split('$&'))[1]}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>

            <Form.Group className="mb-3">
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="留下你的评论吧"
                />
            </Form.Group>

            <Button
                variant="primary"
                onClick={createComment}
                disabled={loading}
            >
                {loading ? <Spinner animation="border" size="sm" /> : '添加评论'}
            </Button>
        </Container>
    );
}

export default ActivityPage;