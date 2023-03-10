import otpGenerator from 'otp-generator';


export const generateOTP = async (req, res) => {
    try {

        req.app.locals.OTP = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
        
        if(!req.app.locals.OTP) res.status(500).send({ success: false, message: 'OTP does not exist!' })

        res.status(200).send({ code: req.app.locals.OTP });

        
    } catch (error) {
        res.status(500).send({ success: false, message: error.message })
    }
}


export const verifyOTP = async (req, res) => {
    try {
        
        const { code } = req.query;
        if(!code) res.status(500).send({ success: false, message: 'can"t find otp!' });

        if(parseInt(code) === parseInt(req.app.locals.OTP)){
            req.app.locals.OTP = null;
            req.app.locals.resetSession = true;
            return res.status(201).send({ success: true, message: 'Verify Successsfully!'})
        };

        res.status(201).send({ success: false, message: 'Invalid OTP'});

        

    } catch (error) {
        res.status(500).send({ success: false, message: error.message })
    }
};


export const resetSession = (req, res) => {
    if(req.app.locals.resetSession) {
        req.app.locals.resetSession = false;
        return res.status(201).send({ success: true, message: 'Access Granted!' });
    }

    return res.status(440).send({ success: false, message: 'Session Expired!' });
}


