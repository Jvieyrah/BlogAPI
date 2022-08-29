const inDisNam = '"displayName" length must be at least 8 characters long';
const inEmail = '"email" must be a valid email';
const inPass = '"password" length must be at least 6 characters long';
const emailchecker = /\S+@\S+\.\S+/;

// const validateDisplayName = (displayName, res) => {
//     if (!displayName || displayName.length < 8) return res.status(400).json({ message: incorrectDisplayName });
   
// };

// const validateEmail = (email, res) => {
//     if (!email || !email.includes(emailchecker)) return res.status(400).json({ message: incorrectEmail });
//     }
// };

// const validatePassword = (password, res) => {
//     if (!password || password.length < 6) return res.status(400).json({ message: incorrectPassword });
//     }
// };

function validate(req, res, next) {    
    const { displayName, email, password } = req.body;
    if (displayName.length < 8) return res.status(400).json({ message: inDisNam });
   
    if (!emailchecker.test(email)) return res.status(400).json({ message: inEmail });
    
    if (password.length < 6) return res.status(400).json({ message: inPass });
    next();
}

module.exports = { validate };