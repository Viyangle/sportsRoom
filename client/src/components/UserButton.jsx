import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function UserButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/user');
    };

    return (
        <div className="user-button">
            <button onClick={handleClick}>User</button>
        </div>
    );
}

export default UserButton;