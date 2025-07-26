import React, { useState, useEffect } from 'react';
import HomeButton from "../components/HomeButton.jsx";
import ManageButton from "../components/ManageButton.jsx";
function UserPage() {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const API_BASE_URL = `http://localhost:3001`;

    const login = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({uid, aid, c})
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || '创建评论失败');
            }

            const createdComment = await response.json();
            setComments([...comments, createdComment]);
            setNewComment('');
            setError('');
        } catch (err) {
            setError(`创建失败: ${err.message}`);
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setUser(localStorage.getItem("user"));
    })

    if (user == null){

    }else {

    }
}

export default UserPage;