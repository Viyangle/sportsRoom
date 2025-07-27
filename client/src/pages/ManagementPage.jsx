import React, {useState, useEffect, act} from 'react';
import HomeButton from "../components/HomeButton.jsx";
import UserButton from "../components/UserButton.jsx";
function ManagementPage() {
    const [newActivity, setNewActivity] = useState({name: '', description: ''});
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
        if (!newActivity.name || !newActivity.description) {
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
            setNewActivity({ name: '', description: ''});
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
        <>
            <div>
                <HomeButton />
                <UserButton />
            </div>
            <div>
                {activities.map(activity => (
                    <div key={activity.id}>
                        <p>{activity.name}</p>
                        <p>{activity.description}</p>
                        <button onClick={() => deleteActivity(activity.id)}>删除</button>
                    </div>
                ))}
            </div>
            <div>
                <div>
                    <input
                        type="text"
                        value={newActivity.name}
                        onChange={(e) => setNewActivity({...newActivity, name: e.target.value})}
                        placeholder="添加活动名"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        value={newActivity.description}
                        onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                        placeholder="添加活动详情"
                    />
                </div>
                <button onClick={createActivity} disabled={loading}>
                    {loading ? '提交中...' : '添加活动'}
                </button>
            </div>
        </>
    );
}

export default ManagementPage;