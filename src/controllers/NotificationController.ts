import { firebaseMessaging } from '../config/firebaseConfig';
import Notification from '../models/Notification';
import { Request, Response } from 'express';

// Send a notification
export const sendNotification = async (req: Request, res: Response) => {
  const { title, message, recipientId } = req.body;

  try {
    // Save notification to the database
    const notification = await Notification.create({
      title,
      message,
      recipientId,
    });

    // Send notification via FCM
    const payload = {
      token: recipientId, // recipient id is the token goten from firebase on the mobile screen
      notification: {
        title,
        body: message,
      },
    };

    await firebaseMessaging.send(payload);

    res.status(200).json({ message: 'Notification sent successfully', notification });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get notifications by user ID
export const getNotificationsByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ recipientId: userId }); // Decide later to fix the real id to be integrated with the mobile app
    res.status(200).json(notifications);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Delete notifications by user ID
export const deleteNotificationsByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await Notification.deleteMany({ recipientId: userId });
    res.status(200).json({ message: `${result.deletedCount} notifications deleted successfully` });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
