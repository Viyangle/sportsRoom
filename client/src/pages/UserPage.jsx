import React, { useState, useEffect } from 'react';
import HomeButton from "../components/HomeButton.jsx";
import ManageButton from "../components/ManageButton.jsx";
function UserPage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(localStorage.getItem("user"));
    })

    if (user == null){

    }else {

    }
}

export default UserPage;