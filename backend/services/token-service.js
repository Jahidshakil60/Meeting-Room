const jwt = require('jsonwebtoken');
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshsTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;


class TokenService{
    generateToken(payload){
        const accessToken = jwt.sign(payload,accessTokenSecret,{
            expiresIn:'1h'
        });
        const refreshToken = jwt.sign(payload,refreshsTokenSecret,{
            expiresIn:'1y'
        });

        return {accessToken,refreshToken}

    }



}

module.exports = new TokenService();