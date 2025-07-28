const activityParticipationService = require('../services/activityParticipationService');

const activityParticipationController = {
    async createActivityParticipation(req, res){
        try {
            const activityParticipationData = req.body;
            const activityParticipation = await activityParticipationService.createActivityParticipation(activityParticipationData);
            res.status(201).json(activityParticipation);
        } catch (error) {
            res.status(500).json({ error: error.message });
            console.log(error);
        }
    },

    async deleteActivityParticipation(req, res){
        try {
            const userId = parseInt(req.params.uid);
            const activityId = parseInt(req.params.aid);
            await activityParticipationService.deleteActivityParticipation(activityId, userId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getAllActivityParticipation(req, res){
        try {
            const activityParticipation = await activityParticipationService.getAllActivityParticipation();
            res.json(activityParticipation);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getAllActivityParticipationById(req, res){
        try {
            const user_id = parseInt(req.params.id);
            const activityParticipation = await activityParticipationService.getAllActivityParticipationById(user_id);
            res.json(activityParticipation);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getActivityParticipationByActivityIdAndUserId(req, res){
        try {
            const userId = parseInt(req.params.uid);
            const activityId = parseInt(req.params.aid);
            const activityParticipation = await activityParticipationService.getActivityParticipationByActivityIdAndUserId(activityId, userId);
            res.json(activityParticipation);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = activityParticipationController;