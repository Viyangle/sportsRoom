import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
// 跳转到用户页面
function UserButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/user');
    };

    return (
        <Button variant="outline-primary" className="me-2" onClick={handleClick}>
            User
        </Button>
    );
}

export default UserButton;