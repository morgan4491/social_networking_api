import mongoose from "mongoose";

const { Schema, model } = mongoose;

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: [280, 'Your reaction cannot be longer than 280 characters']
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAt: Date) => createdAt.toISOString().split('T')[0]
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
        get: (createdAt: Date) => createdAt.toISOString().split('T')[0]
    },
    username: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    reactions: [reactionSchema],
    // Set of virtual 'reactionCount' = length of the user's reactions array
});

const Thought = model('Thought', thoughtSchema);

export default Thought;