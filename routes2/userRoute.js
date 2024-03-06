const express = require('express');
const router = express.Router();
const jwt =require("jsonwebtoken");
const User =require('../models2/user');

// Login route
router.post('/login', async (req, res) => {
    try {
        // Get the login credentials from the request body
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        // If user not found or password doesn't match, return an error
        if (!user || !user.comparePassword(password)) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token for authentication
        const token = jwt.sign({
            user: {
                id: user.id,
            },
        }, 'secret_ecom');

        // Return the token as response
        res.json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Signup route
router.post('/signup', async (req, res) => {
    try {
        // Get the signup data from the request body
        console.log(req.body);
        const { name, email, password, college, role } = req.body;
        console.log(req.body);

        // Create a new user
        const user = new User({ username:name, email, password, college, role });

        // Save the user to the database
        await user.save();

        // Generate a JWT token for authentication
        const token = jwt.sign({
            user: {
                id: user.id,
            },
        }, 'secret_ecom');

        // Return the token as response
        res.json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Dummy user route for testing
router.post('/dummy', async (req, res) => {
    try {
        console.log(req.body);

        // Get the dummy user data from the request body
        const name =  "soham";
        const email= "sohammmargaj55555@gmail.com";
        const password= "123";
        const college= "VIT";
        const role =  "student";

        // Create a new dummy user
        const dummyUser = new User({ username:name, email, password, college, role });

        // Save the dummy user to the database
        await dummyUser.save();

        // Return the dummy user as response
        res.json({ success: true, user: dummyUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get user by ID route
router.get('/user/:id', async (req, res) => {
    try {
        // Get the user ID from the request parameters
        const { id } = req.params;

        // Find the user by ID
        const user = await User.findById(id);

        // If user not found, return an error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the user info as response
        res.json({ success: true, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



module.exports = router;
