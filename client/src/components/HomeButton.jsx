import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function HomeButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };

    return (
        <div className="home-button">
            <button onClick={handleClick}>SportsRoom</button>
        </div>
    );
}

export default HomeButton;