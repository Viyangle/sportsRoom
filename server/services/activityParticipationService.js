const activityParticipationRepository = require('../repositories/activityParticipationRepository');

class ActivityParticipationService {

    // 创建活动参与
    async createActivityParticipation(activityParticipationData) {
        return activityParticipationRepository.create(activityParticipationData);
    }

    // 删除活动参与
    async deleteActivityParticipation(activityId, userId) {
        return activityParticipationRepository.delete(activityId, userId);
    }

    // 获取所有活动参与
    async getAllActivityParticipation() {
        return activityParticipationRepository.findAll();
    }

    // 获取活动参与
    async getAllActivityParticipationById(user_id) {
        return activityParticipationRepository.findById(user_id);
    }

    // 获取活动参与
    async getActivityParticipationByActivityIdAndUserId(activityId, userId) {
        return activityParticipationRepository.findByActivityIdAndUserId(activityId, userId);
    }
}

module.exports = new ActivityParticipationService();