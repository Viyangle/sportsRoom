import React, { useState, useEffect } from 'react';
import ActivityButton from "./ActivityButton.jsx";
import { useNavigate } from "react-router-dom";
function ActivityCard({activity, user}) {
    const [isParticipated, setIsParticipated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate= useNavigate();

    const aid = activity.id;
    const uid = user.id;

    const API_BASE_URL = `http://localhost:3001/activityParticipation`;
    // 加入活动
    const handleClick = async () => {
        setIsLoading( true);
        if (user === null) {
            navigate('/user');
            alert("请先登录");
            setIsLoading( false)
        } else {
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
        const response = await fetch(`${API_BASE_URL}/${uid}/${aid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        setIsParticipated(await response.json() !== null);
    }

    useEffect(() => {
        load();
    }, [])

    return (
        <div className="activity-card">
            <h2>{activity.name}</h2>
            <ActivityButton activity={activity} />
            <button onClick={handleClick} disabled={isLoading}>{isParticipated ? '取消' : '加入'}</button>
        </div>
    );
}

export default ActivityCard;