const incorrectDisplayName = '"displayName" length must be at least 8 characters long';
const incorrectEmail = '"email" must be a valid email';
const incorrectPassword = '"password" length must be at least 6 characters long';

const validateDisplayName = (displayName, res) => {
    if (!displayName || displayName.length < 8) {
        return res.status(400)
        .json({ message: incorrectDisplayName });
    }
};

const validateEmail = (email, res) => {
    if (!email || !email.includes('@')) {
        return res.status(400)
        .json({ message: incorrectEmail });
    }
};

const validatePassword = (password, res) => {
    if (!password || password.length < 6) {
        return res.status(400)
        .json({ message: incorrectPassword });
    }
};

function validate(req, res, next) {    
    const { displayName, email, password } = req.body;
    validateDisplayName(displayName, res);
    validateEmail(email, res);
    validatePassword(password, res);
next();
}

module.exports = { validate };