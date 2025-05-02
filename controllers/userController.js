const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require ('../models/user');
require('dotenv').config(); 
// SIGNUP (CREATE A NEW USER) API
exports.create = async (req, res) => {
    const { email, firstName, lastName, password, phone } = req.body;
    if (!email || !firstName || !lastName || !password || !phone) {
        return res.status(400).send({ message: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: "Email is already in use" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ email, firstName, lastName, phone, password: hashedPassword });

        const savedUser = await newUser.save();
        res.status(201).send({ message: "New user data saved", data: savedUser });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
//LOGIN FOR EXISTING USER
exports.login= async(req,res)=>
{
    try{

        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ email }); 
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
            res.cookie("token", token, { httpOnly: true });
            res.status(200).json({ message: 'Login successful' });
          } else {
            res.status(401).json({ error: 'Invalid credentials' });
          }


        
    }

    catch(err){

        res.status(500).json({ error: 'Server error' , details: err.message });
        
    }
};

//PASSWORD UPDATE FOR EXISTING USER

//first-> middleware for token auth

exports.authenticateToken = async (req,res,next)=>
{
        const token = req.cookies.token;
        if(!token)
        {
            return res.status(401).json(error, "no token found. user not logged in");
        }
        else{
            try{
                const decoded = jwt.verify(token, process.env.SECRET_KEY);
                req.user= decoded;
                next();

            }
            catch{
                return res.status(401).json({ error: 'Invalid token' });
            }
        }
};


exports.updatePassword=async (req, res) =>
{

    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) 
     {
            return res.status(404).json({ error: 'user not found' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) 
        {
            return res.status(401).json({ error: 'old password is incorrect' });
        }
        
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedNewPassword;
    await user.save();
    res.status(200).json({ message: 'Password updated' });
};

exports.updatePhone=async (req, res) =>
    {
        
        const { newPhone } = req.body;
        if (!newPhone) {
            return res.status(400).json({ error: 'New phone number is required' });
        }
        const user = await User.findById(req.user.id);
        if (!user) 
         {
                return res.status(404).json({ error: 'user not found' });
        }
    
        user.phone = newPhone;
        await user.save();
        res.status(200).json({ message: 'Phone number updated' });
    };

exports.updateFirstName = async (req,res)=>
{
        const {newFirstName}= req.body;
        if(!newFirstName)
        {
            return res.status(400).json({error:'new first name is required'});
        }

        const user = await User.findById(req.user.id);
        if(!user)
        {
            return res.status(404).json({error:'user not found'})
        }

        user.firstName = newFirstName;
        await user.save();
        res.status(200).json({ message: 'updated first name' });

};

exports.updateLastName = async (req,res)=>
    {
            const {newLastName}= req.body;
            if(!newLastName)
            {
                return res.status(400).json({error:'new last name is required'});
            }
    
            const user = await User.findById(req.user.id);
            if(!user)
            {
                return res.status(404).json({error:'user not found'})
            }
    
            user.lastName = newLastName;
            await user.save();
            res.status(200).json({ message: 'updated last name' });
    
    };