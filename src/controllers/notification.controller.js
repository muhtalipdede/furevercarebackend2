const Notification = require('../models/notification.model');

exports.getAllNotifications = async (req, res) => {
    try {
        const { id } = req.user;
        const notifications = await Notification.findAll({
            where: {
                user_id: id
            }
        });
        return res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}