import mongoose from "mongoose";
const { Schema, model } = mongoose;
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true // This will trim whitespace from both ends of the string
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
    friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
});
// Set of virtual 'friendCount' = length of the user's friends array
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
const User = model('User', userSchema);
export default User;
