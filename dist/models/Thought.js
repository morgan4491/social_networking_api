import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: [280, 'Your reaction cannot be longer than 280 characters']
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAt) => createdAt.toISOString().split('T')[0]
    }
});
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: [1, 'Your note must be at least 1 character in length'],
        maxlength: [280, 'Your note cannot be longer than 280 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // The getter method helps with formatting the stored timestamp
        get: (createdAt) => createdAt.toISOString().split('T')[0]
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema],
});
// Set of virtual 'reactionCount' = length of the user's reactions array
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
const Thought = model('Thought', thoughtSchema);
export default Thought;
