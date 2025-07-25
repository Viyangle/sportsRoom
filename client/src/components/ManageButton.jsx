import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function ManageButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/management');
    };

    return (
        <div className="manage-button">
            <button onClick={handleClick}>Manage</button>
        </div>
    );
}

export default ManageButton;