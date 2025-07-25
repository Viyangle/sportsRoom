const express = require('express');
const router = express.Router();
const activityParticipationController = require('../controllers/activityParticipationController');

router.get('/:id', activityParticipationController.getAllActivityParticipation);
router.get('/:uid/:aid', activityParticipationController.getActivityParticipationByActivityIdAndUserId);
router.post('', activityParticipationController.createActivityParticipation);
router.delete('/:uid/:aid', activityParticipationController.deleteActivityParticipation);

module.exports = router;