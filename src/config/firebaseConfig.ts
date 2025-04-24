import admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import serviceAccountPath from '../../student-track-app-firebase-adminsdk-fbsvc-f01d3a916d.json';

let firebaseApp: admin.app.App;

if (!admin.apps.length) {
  firebaseApp = admin.initializeApp(
    {
      credential: admin.credential.cert(serviceAccountPath as ServiceAccount),
    },
    'student-tracker'
  );
} else {
  console.log('Firebase app already initialized.');
  firebaseApp = admin.app('student-tracker'); // 👈 ensure we get the named app instance
}

// Now use this app explicitly if needed:
export const firebaseAuth = firebaseApp.auth();
export const firebaseDB = firebaseApp.firestore(); 
export const firebaseMessaging = firebaseApp.messaging();