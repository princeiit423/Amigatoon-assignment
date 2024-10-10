const jwt = require('jsonwebtoken');

// Example login or signup controller
exports.login = (req, res) => {
    const { email, password } = req.body;

    // Verify the user credentials (this is just an example)
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },  
            process.env.JWT_SECRET,                  
            { expiresIn: '1h' }                      
        );

        res.json({
            message: 'Login successful',
            token,  // Send the token to the client
            user: { id: user._id, email: user.email }
        });
    });
};
