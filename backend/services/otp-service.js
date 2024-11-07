const crypto = require('crypto');
const hashService = require('./hash-service');

const smsSid= process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
const twilio = require('twilio')(smsSid,smsAuthToken,{
    lazyLoading:true
})
// console.log(twilio);

class OtpService{

    async generateOtp(){
        const otp = crypto.randomInt(1000,9999)

        return otp;
    }

    async sendBySms(phone,otp){
     return await twilio.messages.create({
        to:phone,
        from:process.env.SMS_FROM_NUMBER,
        body: `Your meetingRoom OTP is ${otp}`
     })
    }

    verifyOtp(hashedOtp,data){
        const computeHash = hashService.hashOtp(data)

        return hashedOtp === computeHash; 
    }



}

module.exports = new OtpService();