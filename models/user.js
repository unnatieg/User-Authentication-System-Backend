const mongoose=require('mongoose');
const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, trim: true },
        lastName: { type: String, trim: true },
        email: { type: String, trim: true, lowercase: true, unique: true, required: 'Email address is required', match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] },
        password: { type: String, required: 'Password is required.', trim: true },
        phone: { type: Number}
    
    }
);

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;