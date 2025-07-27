const activityRepository = require('../repositories/activityRepository');

class ActivityService {
  async createActivity(activityData) {
    if (!activityData.name || !activityData.description) {
      throw new Error('活动名和详情不能为空');
    }
    return await activityRepository.create(activityData);
  }

  async deleteActivity(id) {
    return await activityRepository.delete(id);
  }

  async getAllActivities() {
    return await activityRepository.findAll();
  }

  async getActivityById(id) {
    return await activityRepository.findById(id);
  }
}

module.exports = new ActivityService();