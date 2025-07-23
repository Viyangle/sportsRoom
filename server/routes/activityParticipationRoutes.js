const express = require('express');
const router = express.Router();
const activityParticipationController = require('../controllers/activityParticipationController');

router.get('', activityParticipationController.getAllActivityParticipation);
router.post('', activityParticipationController.createActivityParticipation);
router.delete('/:id', activityParticipationController.deleteActivityParticipation);

module.exports = router;