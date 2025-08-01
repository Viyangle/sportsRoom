const activityRepository = require('../repositories/activityRepository');

class ActivityService {

  // 创建活动
  async createActivity(activityData) {
    if (!activityData.name || !activityData.detail) {
      throw new Error('活动名和详情不能为空');
    }
    return await activityRepository.create(activityData);
  }

  // 更新活动
  async deleteActivity(id) {
    return await activityRepository.delete(id);
  }

  // 获取所有活动
  async getAllActivities() {
    return await activityRepository.findAll();
  }

  // 获取单个活动
  async getActivityById(id) {
    return await activityRepository.findById(id);
  }
}

module.exports = new ActivityService();