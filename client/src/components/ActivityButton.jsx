import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
// 跳转到活动详情页面
function ActivityButton({activity}) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/activity/${activity.id}`);
    };

    return (
            <Button variant="outline-primary" className="me-2" onClick={handleClick}>
                详情
            </Button>
    );
}

export default ActivityButton;