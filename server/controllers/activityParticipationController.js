const activityParticipationService = require('../services/activityParticipationService');

const activityParticipationController = {
    async createActivityParticipation(req, res){
        try {
            const activityParticipationData = req.body;
            const activityParticipation = await activityParticipationService.createActivityParticipation(activityParticipationData);
            res.status(201).json(activityParticipation);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async deleteActivityParticipation(req, res){
        try {
            const { activityId, userId } = req.params;
            await activityParticipationService.deleteActivityParticipation(activityId, userId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getAllActivityParticipation(req, res){
        try {
            const { user_id } = req.params;
            const activityParticipation = await activityParticipationService.getAllActivityParticipation(user_id);
            res.json(activityParticipation);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = activityParticipationController;