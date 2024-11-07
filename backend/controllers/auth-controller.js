const hashService = require('../services/hash-service');
const otpService = require('../services/otp-service');
const userService = require('../services/user-service');
const UserService = require('../services/user-service'); 
const TokenService = require('../services/token-service')


class AuthController {
	async sendOtp(req, res) {
		const { phone } = req.body;
		if (!phone) {
			res.status(400).json({ message: "Phone field is required!" });
		}

        const otp = await otpService.generateOtp();

        console.log(otp);
        
        //hash
        const ttl= 1000*60*2;
        const expires = Date.now() + ttl;
        const data = `${phone}.${otp}.${expires}`

        const hash= hashService.hashOtp(data) 

        //send Otp
        try {
            // await otpService.sendBySms(phone,otp)
            return res.json({
                hash: `${hash}.${expires}`,
                phone,
                otp
            })
        } catch (error) {
            console.log(error);
            throw error;
            
            // res.status(500).json({message: ' message sending failed'})
        }
  
	}

    async verifyOtp(req,res){
        const {otp,hash,phone} =req.body;
        if(!otp || !hash || !phone){
            res.status(400).json({message: 'All fielda are required'})
        }

        const [hashedOtp, expires] = hash.split('.')
        if(Date.now() > +expires){
            res.status(400).json({message: "OTP expired!"})
        }

        const data = `${phone}.${otp}.${expires}`;
        const isvalid = otpService.verifyOtp(hashedOtp,data);

        if(!isvalid){
            res.status(400).json({message:"Invalid OTP"})
        }

        let user;
        

        try {
            user = await userService.findUser({phone});

            if(!user){
                user = await userService.createUser({ phone});
            }
            
        } catch (error) {
            console.log(error);

            res.status(500).json({message:'Db error'})
            
        }
        
        //token
        const {accessToken, refreshToken}=TokenService.generateToken({_id:user._id,activated: false});

        res.cookie('refreshtoken',refreshToken,{
            maxAge: 1000*60*60*24*30,
            httpOnly: true
        })

        res.json({accessToken,user});


    }
}

module.exports = new AuthController();
