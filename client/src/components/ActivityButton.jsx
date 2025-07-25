import React from "react";
import { useNavigate } from "react-router-dom";
function ActivityButton(activity) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/activity/${activity.id}`);
    };

    return (
        <div className="activity-button">
            <button onClick={handleClick}>详情</button>
        </div>
    );
}

export default ActivityButton;