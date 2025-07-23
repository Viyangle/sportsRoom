// app.js
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const activityRoutes = require('./routes/activityRoutes');
const activityParticipationRoutes = require('./routes/activityParticipationRoutes');
const commentRoutes = require('./routes/commentRoutes');
const cors = require('cors');

// 中间件配置
app.use(cors({
    origin: 'http://localhost:5173', // 你的前端地址
    methods: ['GET', 'POST', 'PUT', 'DELETE']
})); // 允许跨域请求
app.use(express.json()); // 解析 JSON 请求体

// 挂载用户路由
app.use('/users', userRoutes);
app.use('/activities', activityRoutes);
app.use('/activityParticipation', activityParticipationRoutes);
app.use('/comments', commentRoutes);

// 错误处理中间件
/*app.use((err, req, res,next) => {
    console.error('全局错误:', err.stack);
    res.status(500).json({ error: '服务器内部错误' });
});*/

// 启动服务器
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`服务器运行中: http://localhost:${PORT}`);
});