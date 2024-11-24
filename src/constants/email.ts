export const emailTemplate = `
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f9f9f9;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        background: #007bff;
        color: #ffffff;
        text-align: center;
        padding: 10px;
        border-radius: 8px 8px 0 0;
      }
      .content {
        margin: 20px 0;
        line-height: 1.6;
      }
      .otp-code {
        font-size: 24px;
        font-weight: bold;
        color: #007bff;
        text-align: center;
        margin: 20px 0;
      }
      .footer {
        text-align: center;
        font-size: 12px;
        color: #777;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>OTP Verification</h1>
      </div>
      <div class="content">
        <p>Dear User,</p>
        <p>Your OTP code is:</p>
        <div class="otp-code">{{OTP_CODE}}</div>
        <p>
          Please use this code to verify your account. The code is valid for 5
          minutes.
        </p>
      </div>
      <div class="footer">
        <p>&copy; 2024 Nphn Storage. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
`;
