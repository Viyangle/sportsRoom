import React, { useState, useEffect } from 'react';
import HomeButton from "../components/HomeButton.jsx";
import ManageButton from "../components/ManageButton.jsx";
function UserPage() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const API_BASE_URL = `http://localhost:3001`;

    const register = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name, email, password})
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || '创建用户失败');
            }

            const createdUser = await response.json();
            setUser(createdUser);
            localStorage.setItem('user', JSON.stringify(createdUser));
            setName( '');
            setEmail('');
            setPassword('');
            setError('');
        } catch (err) {
            setError(`创建失败: ${err.message}`);
            console.error(err);
        }
    };

    const login = async () => {
        if (!name || !email || !password) {
            setError('请填写完整信息');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/users/email/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                return register();
            }

            const u = await response.json();

            if (u.name !== name){
                throw new Error('用户名或密码错误');
            }

            if (u.password !== password){
                throw new Error('用户名或密码错误');
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


    if (user === null){
        return(
            <>
                <div>
                    <HomeButton/>
                </div>

                <div>
                    <div>
                        <label>用户名</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="请填写用户名"
                        />
                    </div>
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
                    {(user.email === 'admin@163.com') && <ManageButton/>}
                </div>
            </>
        )
    }
}

export default UserPage;