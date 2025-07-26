import React, { useState, useEffect } from 'react';
import HomeButton from "../components/HomeButton.jsx";
import ManageButton from "../components/ManageButton.jsx";
function UserPage() {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const API_BASE_URL = `http://localhost:3001`;

    const login = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/users/email`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email})
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || '邮箱或密码错误');
            }

            const u = await response.json();

            if (u.password !== password){
                throw new Error('邮箱或密码错误');
            }

            setUser(u);
            localStorage.setItem('user', JSON.stringify(u));
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
        return(
            <>
                <div>
                    <HomeButton/>
                </div>

                <div>
                    <div>
                        <label>邮箱</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="请填写邮箱"
                        />
                    </div>
                    <div>
                        <label>密码</label>
                        <input
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="请填写密码"
                        />
                    </div>
                    <button onClick={login} disabled={loading}>
                        {loading ? '加载中...' : '登录'}
                    </button>
                </div>
            </>
        )
    }else {
        return (
            <>
                <div>
                    <HomeButton/>
                </div>
                <div>
                    <p>name: {user.name}</p>
                    <p>email: {user.email}</p>
                </div>
                <div>
                    {(user.email === 'administrator@163.com') && <ManageButton/>}
                </div>
            </>
        )
    }
}

export default UserPage;