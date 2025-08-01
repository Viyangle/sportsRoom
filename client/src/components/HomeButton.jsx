import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
// 跳转到主页
function HomeButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };

    return (
        <Button variant="outline-primary" className="me-2" onClick={handleClick}>
            SportsRoom
        </Button>
    );
}

export default HomeButton;