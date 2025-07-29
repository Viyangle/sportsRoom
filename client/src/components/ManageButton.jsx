import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
function ManageButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/management');
    };

    return (
            <Button variant="outline-primary" className="me-2" onClick={handleClick}>
                活动管理
            </Button>
    );
}

export default ManageButton;