import { firebaseMessaging } from '../config/firebaseConfig';
import { sendEmail } from '../config/nodemailer.config';
import Notification from '../models/Notification';
import { Request, Response } from 'express';

// Send a notification
export const sendEmergencyAlert = async (req: Request, res: Response) => {
  const { title, message, recipientId } = req.body;

  try {
    console.log("Request body:", req.body);
    // Save notification to the database
    const notification = await Notification.create({
      title,
      message,
      recipientId,
    });

    // Send notification via FCM
    // const payload = {
    //   token: userFCMToken, // recipient id is the token goten from firebase on the mobile screen
    //   notification: {
    //     title,
    //     body: message,
    //   },
    // };

    const userEmail = "aishajuluri@gmail.com";
    // const userEmail = "muhammadhamza162003@gmail.com";
    await sendEmail({to:userEmail , subject: title, html: message, location: req.body.location});
    // await firebaseMessaging.send(payload);

    res.status(200).json({ message: 'Notification sent successfully', notification });
  } catch (error: any) {
    console.error("Error sending notification:", error);
    res.status(500).json({ error: error.message });
  }
};
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
    const userId = req.params.id; // Assuming userId is the uid from the mobile app
    console.log("Fetching notifications for user ID:", userId);
    const notifications = await Notification.find({ recipientId: userId }).sort({ sentAt: -1 });
    // Decide later to fix the real id to be integrated with the mobile app
    res.status(200).json(notifications);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Delete notifications by user ID
export const deleteNotificationsByUser = async (req: Request, res: Response) => {
  try {
    const notificationId = req.params.id; //  id is notification id
    console.log("Deleting notifications for user ID:", notificationId);
    await Notification.findByIdAndDelete(notificationId);
    res.status(200).json({ message: `notifications deleted successfully` });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
