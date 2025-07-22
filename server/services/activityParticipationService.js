const activityParticipationRepository = require('../repositories/activityParticipationRepository');

class ActivityParticipationService {
    async createActivityParticipation(activityParticipationData) {
        return activityParticipationRepository.create(activityParticipationData);
    }
    async deleteActivityParticipation(activityId, userId) {
        return activityParticipationRepository.delete(activityId, userId);
    }
    async findAll(user_id) {
        return activityParticipationRepository.findAll(user_id);
    }
}

module.exports = new ActivityParticipationService();