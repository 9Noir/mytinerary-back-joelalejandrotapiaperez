export default (name, link) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset</title>
</head>

<body style="font-family: Arial, sans-serif; background-color: #f0f0f0; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border: 1px solid #e0e0e0;">
    <div style="background-color: #2563eb; color: #ffffff; text-align: center; padding: 20px 0;">
      <h1>Password Reset</h1>
    </div>
    <div style="padding: 20px;">
      <p>Dear ${name},</p>
      <p>You are receiving this email because you have requested to reset the password for your account on MyTinerary.</p>
      <p>Please click the button below to reset your password securely:</p>
      <a href="${link}" style="text-decoration: none; background-color: #2563eb; padding: 10px 20px; border-radius: 5px; display: inline-block; color: #fff">Reset Password</a>
      <p>If you are unable to click the button above, you can also copy and paste the following link into your web browser's address bar:</p>
      <a href="${link}" style="color: #2563eb; text-decoration: underline; display: inline-block;">${link}</a>
      <p>If you did not request a password reset, you can safely ignore this email.</p>
      <p>Thank you for choosing MyTinerary.</p>
      <p>Best regards,</p>
      <p>The Support Team at MyTinerary</p>
    </div>
    <div style="text-align: center; background-color: #f0f0f0; padding: 10px;">
      &copy; 2023 MyTinerary
    </div>
  </div>
</body>

</html>            
    `;
