import React, { useState, useEffect } from 'react';
import HomeButton from "../components/HomeButton.jsx";
import ManageButton from "../components/ManageButton.jsx";
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
function UserPage() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const API_BASE_URL = `http://localhost:3001`;

    // 创建用户
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

    // 登录
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

    // 退出登录
    const exit = () => {
        localStorage.removeItem('user');
        setUser(null);
    }

    if (user === null){
        return (
            <Container>
                <HomeButton />
                <Card className="mt-4">
                    <Card.Body>
                        <Card.Title>登录/注册</Card.Title>
                        {error && <Alert variant="danger">{error}</Alert>}

                        <Form.Group className="mb-3">
                            <Form.Label column={true}>用户名</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="请填写用户名"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label column={true}>邮箱</Form.Label>
                            <Form.Control
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="请填写邮箱"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label column={true}>密码</Form.Label>
                            <Form.Control
                                type="text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="请填写密码"
                            />
                        </Form.Group>

                        <Button
                            variant="primary"
                            onClick={login}
                            disabled={loading}
                            className="w-100"
                        >
                            {loading ? <Spinner animation="border" size="sm" /> : '登录'}
                        </Button>
                    </Card.Body>
                </Card>
            </Container>
        );
    }else {
        return (
            <Container>
                <HomeButton />
                <Card className="mt-4">
                    <Card.Body>
                        <Card.Title>用户信息</Card.Title>
                        <Card.Text>name: {user.name}</Card.Text>
                        <Card.Text>email: {user.email}</Card.Text>

                        <div className="d-flex gap-2">
                            {(user.email === 'admin@163.com') && <ManageButton />}
                            <Button variant="outline-danger" onClick={exit}>退出登录</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default UserPage;