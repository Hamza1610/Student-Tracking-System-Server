// utils/mailer.ts
import nodemailer from 'nodemailer';
import dotenv from 'dotenv'


dotenv.config();

type EmailOptions = {
  to: string;
  subject: string;
  html: string;
  location: {
    latitude: number;
    longitude: number;
    timestamp?: string;
  };
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendEmail = async ({ to, subject, html, location }: EmailOptions) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Emergency Alert</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .header {
          background-color: #dc3545;
          color: white;
          padding: 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
        }
        .content {
          padding: 20px;
        }
        .alert-box {
          background-color: #fff3cd;
          border: 1px solid #ffeeba;
          color: #856404;
          padding: 15px;
          border-radius: 4px;
          margin-bottom: 20px;
        }
        .location-info {
          background-color: #f8f9fa;
          border: 1px solid #dee2e6;
          border-radius: 4px;
          padding: 15px;
          margin-bottom: 20px;
        }
        .location-info h3 {
          margin-top: 0;
          color: #343a40;
        }
        .location-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .location-item {
          padding: 10px;
          background-color: #e9ecef;
          border-radius: 4px;
        }
        .location-label {
          font-weight: bold;
          color: #495057;
        }
        .location-value {
          color: #212529;
        }
        .map-link {
          display: inline-block;
          background-color: #007bff;
          color: white;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 4px;
          margin-top: 10px;
        }
        .footer {
          background-color: #f8f9fa;
          padding: 15px;
          text-align: center;
          font-size: 12px;
          color: #6c757d;
          border-top: 1px solid #dee2e6;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚨 Emergency Alert</h1>
        </div>
        <div class="content">
          <div class="alert-box">
            <strong>⚠️ Emergency Alert:</strong> A student has triggered an emergency alert. Please take immediate action.
          </div>
          
          <div class="location-info">
            <h3>📍 Student Location Details</h3>
            <div class="location-details">
              <div class="location-item">
                <span class="location-label">Latitude:</span>
                <span class="location-value">${location.latitude}</span>
              </div>
              <div class="location-item">
                <span class="location-label">Longitude:</span>
                <span class="location-value">${location.longitude}</span>
              </div>
              <div class="location-item">
                <span class="location-label">Time:</span>
                <span class="location-value">${location.timestamp || new Date().toLocaleString()}</span>
              </div>
            </div>
            <a href="https://www.google.com/maps?q=${location.latitude},${location.longitude}" 
               class="map-link" 
               target="_blank">
              View Location on Google Maps
            </a>
          </div>
          
          <p>${html}</p>
        </div>
        <div class="footer">
          <p>This is an automated emergency alert. Please respond immediately.</p>
          <p>© ${new Date().getFullYear()} Student Tracking System</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({ 
    from: process.env.EMAIL_USER, 
    to, 
    subject, 
    html: htmlContent 
  });
};
