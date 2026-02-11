
const registerUser = (req, res) => {

    const { username, email, password } = req.body;

    res.json({ 
        ok: true,
        message: 'User registered successfully'
    });
};

const loginUser = (req, res) => {

    const { email, password } = req.body;

    res.json({
        ok: true,
        message: 'User logged in successfully'
    });
};

const renewToken = (req, res) => {
    res.json({
        ok: true,
        message: 'Token renewed successfully'
    });
};





module.exports = {
    registerUser,
    loginUser,
    renewToken
};