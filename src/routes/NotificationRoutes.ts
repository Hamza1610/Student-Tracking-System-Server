import { Router } from 'express';
import { sendEmergencyAlert, sendNotification,getNotificationsByUser, deleteNotificationsByUser } from '../controllers/NotificationController';

const router = Router();

// router.post('/send', sendNotification);
router.post('/emergency', sendEmergencyAlert); // Send emergency notification
router.get('/:id', getNotificationsByUser);
router.delete('/:id', deleteNotificationsByUser);

export default router;