import React, { useState, useEffect } from 'react';
import HomeButton from '../components/HomeButton';
import UserButton from "../components/UserButton.jsx";
import ActivityCard from "../components/ActivityCard.jsx";
import UserManager from "../components/userManager.jsx";
function MainPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activities, setActivities] = useState([]);
    const [filteredActivities, setFilteredActivities] = useState([]);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

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

    // 处理搜索输入变化
    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term.trim() === '') {
            // 搜索框为空时显示所有活动
            setFilteredActivities(activities);
        } else {
            // 过滤活动
            const filtered = activities.filter(activity =>
                activity.name.includes(term)
            );
            setFilteredActivities(filtered);
        }
    };

    // 处理搜索提交（按回车或按钮）
    const handleSearchSubmit = (e) => {
        e.preventDefault(); // 阻止表单默认提交行为
    };

    useEffect(() => {
        setUser(localStorage.getItem("user"));
        fetchActivities();
    })

    return (
        <>
            <div>
                <HomeButton/>
                <form onSubmit={handleSearchSubmit} className="search-form">
                    <input
                        type="text"
                        placeholder="搜索活动名称..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                    <button type="submit" className="search-button">搜索</button>
                </form>
                <UserButton/>
            </div>

            <div>
                {filteredActivities.length > 0 ? (
                    filteredActivities.map(activity => (
                        <ActivityCard key={activity.id} activity={activity} user={user} />
                    ))
                ) : (
                    <div className="no-results">
                        <p>没有找到符合条件的活动</p>
                    </div>
                )}
            </div>

            <UserManager/>
        </>
    )
}

export default MainPage;