const express = require('express');
const router = express.Router();
const activityParticipationController = require('../controllers/activityParticipationController');


// 活动参与路由配置
router.get('', activityParticipationController.getAllActivityParticipation);
router.get('/:id', activityParticipationController.getAllActivityParticipationById);
router.get('/:uid/:aid', activityParticipationController.getActivityParticipationByActivityIdAndUserId);
router.post('', activityParticipationController.createActivityParticipation);
router.delete('/:uid/:aid', activityParticipationController.deleteActivityParticipation);

module.exports = router;