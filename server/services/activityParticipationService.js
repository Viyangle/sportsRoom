const activityParticipationRepository = require('../repositories/activityParticipationRepository');

class ActivityParticipationService {
    async createActivityParticipation(activityParticipationData) {
        return activityParticipationRepository.create(activityParticipationData);
    }
    async deleteActivityParticipation(activityId, userId) {
        return activityParticipationRepository.delete(activityId, userId);
    }
    async getAllActivityParticipation(user_id) {
        return activityParticipationRepository.findAll(user_id);
    }
    async getActivityParticipationByActivityIdAndUserId(activityId, userId) {
        return activityParticipationRepository.findByActivityIdAndUserId(activityId, userId);
    }
}

module.exports = new ActivityParticipationService();