import React, {useState, useEffect, act} from 'react';
import HomeButton from "../components/HomeButton.jsx";
import UserButton from "../components/UserButton.jsx";
import { Container, Card, Form, Button, ListGroup, Spinner } from 'react-bootstrap';
function ManagementPage() {
    const [newActivity, setNewActivity] = useState({name: '', detail: ''});
    const [loading, setLoading] = useState(false);
    const [activities, setActivities] = useState([]);
    const [error, setError] = useState('');

    const API_BASE_URL = `http://localhost:3001/activities`;

    const fetchActivities = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}`);

            if (!response.ok) {
                throw new Error(`请求失败: ${response.status}`);
            }

            const data = await response.json();
            setActivities(data);
            setError('');
        } catch (err) {
            setError(`获取活动失败: ${err.message}`);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    
    const createActivity = async () => {
        if (!newActivity.name || !newActivity.detail) {
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
                body: JSON.stringify(newActivity)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || '创建活动失败');
            }

            const createdActivity = await response.json();
            setActivities([...activities, createdActivity]);
            setNewActivity({ name: '', detail: ''});
            setError('');
        } catch (err) {
            setError(`创建失败: ${err.message}`);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    
    const deleteActivity = async (id) => {
        if (!window.confirm('确定要删除该活动吗？')) return;

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error(`删除失败: ${response.status}`);
            }

            setActivities(activities.filter(user => user.id !== id));
            setError('');
        } catch (err) {
            setError(`删除失败: ${err.message}`);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchActivities();
    },[]);

    return (
        <Container>
            <div className="d-flex justify-content-between mb-4">
                <HomeButton />
                <UserButton />
            </div>

            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>活动列表</Card.Title>
                    <ListGroup>
                        {activities.map(activity => (
                            <ListGroup.Item key={activity.id} className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6>{activity.name}</h6>
                                    <p className="mb-0 text-muted">{activity.detail}</p>
                                </div>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => deleteActivity(activity.id)}
                                >
                                    删除
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card.Body>
            </Card>

            <Card>
                <Card.Body>
                    <Card.Title>添加新活动</Card.Title>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            value={newActivity.name}
                            onChange={(e) => setNewActivity({...newActivity, name: e.target.value})}
                            placeholder="活动名称"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={newActivity.detail}
                            onChange={(e) => setNewActivity({...newActivity, detail: e.target.value})}
                            placeholder="活动详情"
                        />
                    </Form.Group>
                    <Button
                        variant="success"
                        onClick={createActivity}
                        disabled={loading}
                    >
                        {loading ? <Spinner animation="border" size="sm" /> : '添加活动'}
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ManagementPage;