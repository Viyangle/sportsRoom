import React, { useState, useEffect } from 'react';
import ActivityButton from "./ActivityButton.jsx";
import { useNavigate } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
function ActivityCard({activity, user}) {
    const [isParticipated, setIsParticipated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate= useNavigate();

    const aid = activity.id;



    const API_BASE_URL = `http://localhost:3001/activityParticipation`;
    // 加入活动
    const handleClick = async () => {
        setIsLoading( true);
        if (user === null) {
            navigate('/user');
            alert("请先登录");
            setIsLoading( false)
        } else {
            const uid = user.id;
            if (isParticipated) {
                try {
                    const response = await fetch(`${API_BASE_URL}/${uid}/${aid}`,{
                        method: 'DELETE',
                        }
                    );

                    if (!response.ok) {
                        throw new Error(`删除失败: ${response.status}`);
                    }

                    setIsParticipated(false);
                    alert('已取消参与');
                } catch (error) {
                    console.error('Error:', error);
                } finally {
                    setIsLoading( false);
                }
            } else {
                try {
                    const data = {
                        activityId : aid,
                        userId : uid
                    }

                    const response = await fetch(`${API_BASE_URL}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data)
                    });

                    if (!response.ok) {
                        throw new Error(`请求失败: ${response.status}`);
                    }

                    setIsParticipated( true);
                    alert('已成功加入活动');
                } catch (err) {
                    console.error(err);
                } finally {
                    setIsLoading( false);
                }
            }
        }
    }

    const load = async () => {
        if (user !== null){
            const uid = user.id;
            const response = await fetch(`${API_BASE_URL}/${uid}/${aid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            setIsParticipated(await response.json() !== null);
        } else {
            setIsParticipated(false);
        }

    }

    useEffect(() => {
        load();
    }, [])

    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>{activity.name}</Card.Title>
                <div className="d-flex justify-content-between">
                    <ActivityButton activity={activity} />
                    <Button
                        variant={isParticipated ? "outline-danger" : "success"}
                        onClick={handleClick}
                        disabled={isLoading}
                    >
                        {isParticipated ? '取消' : '加入'}
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default ActivityCard;