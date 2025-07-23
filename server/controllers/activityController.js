const activityService = require('../services/activityService');

const activityController = {
  async createActivity(req, res) {
      try {
          const newActivity = await activityService.createActivity(req.body);
          res.status(201).json(newActivity);
      } catch (error) {
          console.error('创建活动失败:', error);
          res.status(400).json({ error: error.message || '请求错误' });
      }
  },

  async deleteActivity(req, res) {
      try {
          const activityId = parseInt(req.params.id);
          if (isNaN(activityId)) {
              return res.status(400).json({ error: '无效的活动ID' });
          }

          const success = await activityService.deleteActivity(activityId);
          if (success) {
              res.status(204).send();
          } else {
              res.status(404).json({ error: '活动不存在' });
          }
      } catch (error) {
          console.error('删除活动失败:', error);
          res.status(500).json({ error: error.message || '服务器错误' });
      }
  },

  async getActivityById(req, res) {
      try {
          const activityId = parseInt(req.params.id);
          if (isNaN(activityId)) {
              return res.status(400).json({ error: '无效的活动ID' });
          }

          const activity = await activityService.getActivityById(activityId);
          if (activity) {
              res.status(200).json(activity);
          } else {
              res.status(404).json({ error: '活动不存在' });
          }
      } catch (error) {
          console.error('获取活动失败:', error);
          res.status(500).json({ error: error.message || '服务器错误' });
      }
  },

    async getAllActivities(req, res) {
      try {
          const activities = await activityService.getAllActivities();
          res.status(200).json(activities);
      } catch (error) {
          console.error('获取所有活动失败:', error);
          res.status(500).json({ error: error.message || '服务器错误' });
      }
  },
}

module.exports = activityController;