import React, { useState, useEffect } from 'react';
import HomeButton from '../components/HomeButton.jsx';
import UserButton from "../components/UserButton.jsx";
import ActivityCard from "../components/ActivityCard.jsx";
import UserManager from "../components/userManager.jsx";
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
function MainPage() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [loading, setLoading] = useState(false);
    const [activities, setActivities] = useState([]);
    const [filteredActivities, setFilteredActivities] = useState([]);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const API_BASE_URL = `http://localhost:3001/activities`;

    // 获取所有活动
    const fetchActivities = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}`);

            if (!response.ok) {
                throw new Error(`请求失败: ${response.status}`);
            }

            const data = await response.json();
            setActivities(data);
            setFilteredActivities(data);
            setError('');
        } catch (err) {
            setError(`获取活动失败: ${err.message}`);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // 处理搜索输入变化
    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
    };

    // 触发搜索逻辑
    const handleSearch = () => {
        if (searchTerm === null || searchTerm === '') {
            // 搜索框为空时显示所有活动
            setFilteredActivities(activities);
        } else {
            // 过滤活动
            const filtered = activities.filter(activity =>
                activity.name.includes(searchTerm)
            );
            setFilteredActivities(filtered);
        }
    };

    // 处理搜索提交（按回车或按钮）
    const handleSearchSubmit = (e) => {
        e.preventDefault(); // 阻止表单默认提交行为
    };

    useEffect(() => {
        fetchActivities();
    },[])

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <HomeButton />
                <Form onSubmit={handleSearchSubmit} className="flex-grow-1 mx-3">
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="搜索活动名称..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <Button variant="primary" onClick={handleSearch}>
                            搜索
                        </Button>
                    </InputGroup>
                </Form>
                <UserButton />
            </div>

            <Row>
                {filteredActivities.length === 0 ? (
                    <Col md={12} className="text-center">
                        <p className="fs-4">无对应活动</p>
                    </Col>
                ) : (
                    filteredActivities.map((activity) => (
                        <Col key={activity.id} md={6} lg={4} className="mb-4">
                            <ActivityCard activity={activity} user={user} />
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );
}

export default MainPage;