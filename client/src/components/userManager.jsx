// src/components/UserManager.jsx
import React, { useState, useEffect } from 'react';

function UserManager() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // 配置后端基础URL
    const API_BASE_URL = `http://localhost:3001/users`;

    // 获取所有用户
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}`);

            if (!response.ok) {
                throw new Error(`请求失败: ${response.status}`);
            }

            const data = await response.json();
            setUsers(data);
            setError('');
        } catch (err) {
            setError(`获取用户失败: ${err.message}`);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // 创建新用户
    const createUser = async () => {
        if (!newUser.name || !newUser.email) {
            setError('请填写完整信息');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || '创建用户失败');
            }

            const createdUser = await response.json();
            setUsers([...users, createdUser]);
            setNewUser({ name: '', email: '' });
            setError('');
        } catch (err) {
            setError(`创建失败: ${err.message}`);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // 删除用户
    const deleteUser = async (id) => {
        if (!window.confirm('确定要删除该用户吗？')) return;

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error(`删除失败: ${response.status}`);
            }

            setUsers(users.filter(user => user.id !== id));
            setError('');
        } catch (err) {
            setError(`删除失败: ${err.message}`);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // 组件挂载时获取用户
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="user-manager">
            <h1>用户管理系统</h1>

            {error && <div className="error">{error}</div>}

            <div className="user-form">
                <h2>添加新用户</h2>
                <div>
                    <label>姓名:</label>
                    <input
                        type="text"
                        value={newUser.name}
                        onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                        placeholder="输入姓名"
                    />
                </div>
                <div>
                    <label>邮箱:</label>
                    <input
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                        placeholder="输入邮箱"
                    />
                </div>
                <button onClick={createUser} disabled={loading}>
                    {loading ? '提交中...' : '添加用户'}
                </button>
            </div>

            <h2>用户列表</h2>
            {loading ? (
                <p>加载中...</p>
            ) : users.length === 0 ? (
                <p>没有用户数据</p>
            ) : (
                <table className="user-table">
                    <thead>
                    <tr>
                        {/*<th>ID</th>*/}
                        <th>姓名</th>
                        <th>邮箱</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            {/*<td>{user.id}</td>*/}
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => deleteUser(user.id)} disabled={loading}>
                                    删除
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default UserManager;