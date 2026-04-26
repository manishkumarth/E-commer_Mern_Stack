const axios = require("axios");

const sendEmail = async (toEmail, otp) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "ManishDev",
          email: "manish12099@gmail.com",
        },
        to: [{ email: toEmail }],
        subject: "Your OTP Code",
        htmlContent: `
          <div style="font-family: Arial">
            <h2>OTP Verification</h2>
            <p>Your OTP is:</p>
            <h1 style="letter-spacing: 4px">${otp}</h1>
            <p>This OTP is valid for 5 minutes.</p>
          </div>
        `,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("OTP email sent ", response.data);
    return true;
  } catch (error) {
    console.error(
      "Brevo OTP Error ",
      error.response?.data || error.message
    );
    return false;
  }
};

module.exports = sendEmail;
