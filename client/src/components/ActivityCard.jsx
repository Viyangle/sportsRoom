import React, { useState, useEffect } from 'react';
import ActivityButton from "./ActivityButton.jsx";
import { useNavigate } from "react-router-dom";
function ActivityCard({activity, user}) {
    const [isParticipated, setIsParticipated] = useState(false);
    const navigate= useNavigate();

    const aid = activity.id;
    const uid = user.id;

    const API_BASE_URL = `http://localhost:3001/activityParticipation`;
    // 加入活动
    const handleClick = async () => {
        if (user === null) {
            navigate('/user');
            alert("请先登录");
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
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                try {
                    const response = await fetch(`${API_BASE_URL}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({aid, uid})
                    });

                    if (!response.ok) {
                        throw new Error(`请求失败: ${response.status}`);
                    }

                    setIsParticipated( true);
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }

    useEffect(async () => {
        const response = await fetch(`${API_BASE_URL}/${uid}/${aid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        setIsParticipated(response.ok)
    })

    return (
        <div className="activity-card">
            <h2>{activity.title}</h2>
            <ActivityButton activity={activity} />
            <button onClick={handleClick}>{isParticipated ? '取消' : '加入'}</button>
        </div>
    );
}

export default ActivityCard;