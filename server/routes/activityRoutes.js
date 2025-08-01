const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

// 活动路由配置
router.get('', activityController.getAllActivities);
router.get('/:id', activityController.getActivityById);
router.post('', activityController.createActivity);
router.delete('/:id', activityController.deleteActivity);

module.exports = router;