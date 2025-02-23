const twilio = require("twilio");

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

const sendOTP = async (phone, otp) => {
  try {
    const message = await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: fromNumber,
      to: `+91${phone}`,
    });

    console.log(message.body);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendOTP };
