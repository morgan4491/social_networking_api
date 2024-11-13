import { Request, Response } from 'express';
import User from '../models/User.js';
import Thought from '../models/Thought.js';

// GET all users
export async function findAllUsers(_: Request, res: Response) {
    // The lean() method is a performance improvement
    const users = await User.find().lean();

    const usersWithFriendCount = users.map(user => ({
        ...user,
        friendCount: user.friends.length
    }));

    res.json(usersWithFriendCount);
}

// GET a single user by its '_id' and populate thoughts and friend data
export async function getSingleUserData(req: Request, res: Response) {
    const user_id = req.params.userId;

    const user = await User.findById(user_id).populate({path: 'thoughts'}).populate({path: 'friends'});

    res.json(user);
}

export async function createUser(req: Request, res: Response) {
    try {
        const user = await User.create(req.body);

        res.json({
            user: user
        })
    } catch (error: any) {
        const errors: String[] = [];

        if (error.code === 11000) {
            errors.push('That username is already in use!');
        } else {
            for (const prop in error.errors) {
                errors.push(error.errors[prop].message);
            }
        }

        res.json(errors);
    }
}

export async function updateUserById(req: Request, res: Response) {
    const user_id = req.params.userId;
    
    try {
        const user = await User.findByIdAndUpdate(user_id, {
            $set: {
                username: req.body.username,
                email: req.body.email
            }
        }, { new: true });

        res.json(user);
    } catch (error) {
        res.json(error);
    }
}

export async function deleteUserById(req: Request, res: Response) {
    const user_id = req.params.userId;

    try {
        const user = await User.findByIdAndDelete(user_id);
        await Thought.deleteMany({
            _id: {
                $in: user?.thoughts
            }
        });

        res.json({
            message: "User and associated thoughts deleted!"
        })
    } catch (error) {
        res.json(error);
    }
}

export async function addFriendToUser(req: Request, res: Response) {
    const user_id = req.params.userId;
    const friend_id = req.params.friendId;

    try {
        const user = await User.findByIdAndUpdate(user_id, {
            $push: {
                friends: friend_id
            }
        })
    
        res.json(user);
    } catch (error) {
        res.json(error);
    }
    
}

export async function deleteFriendFromUser(req: Request, res: Response) {
    const user_id = req.params.userId;
    const friend_id = req.params.friendId;

    const user = await User.findByIdAndUpdate(user_id, {
        $pull: {
            friends: friend_id
        }
    })

    res.json(user);
}

export async function getAllThoughts(_: Request, res: Response) {
    const thoughts = await Thought.find().lean();

    const thoughtsWithReactionCount = thoughts.map(thought => ({
        ...thought,
        reactionCount: thought.reactions.length
    }));    

    res.json(thoughtsWithReactionCount);
}

export async function getSingleThoughtById(req: Request, res: Response) {
    const thought_id = req.params.thoughtId;

    const thoughts = await Thought.findById(thought_id);

    res.json(thoughts);
}

export async function createThought(req: Request, res: Response) {
    const user_id = req.params.userId;

    const thought = await Thought.create(req.body);

    const user = await User.findByIdAndUpdate(user_id, {
        $push: {
            thoughts: thought._id
        }
    })

    res.json(user);
}

export async function updateThoughtById(req: Request, res: Response) {
    const thought_id = req.params.thoughtId;

    console.log(thought_id);

    try {
        const thought = await Thought.findByIdAndUpdate(thought_id, {
            $set: {
                thoughtText: req.body.thoughtText,
                username: req.body.username
            }
        }, { new: true });
        
        res.json(thought);
    } catch (error) {
        res.json(error);
    }

}

export async function deleteThoughtById(req: Request, res: Response) {
    const thought_id = req.params.thoughtId;
    await Thought.findByIdAndDelete(thought_id);

    const user = await User.findOneAndUpdate({
        thoughts: thought_id
    }, {
        $pull: {
            thoughts: thought_id
        }
    })

    res.json({
        message: 'Thought deleted successfully',    
        user: user
    });

}

export async function createReaction(req: Request, res: Response) {
    const thought_id = req.params.thoughtId;
    const reaction = req.body;

    const thought = await Thought.findByIdAndUpdate(thought_id, {
        $push: {
            reactions: reaction
        }
    })

    res.json(thought);
}

export async function deleteReactionById(req: Request, res: Response) {
    const thought_id = req.params.thoughtId;
    const reaction_id = req.params.reactionId;

    try {
        const thought = await Thought.findByIdAndUpdate(thought_id, {
            $pull: {
                reactions: { _id: reaction_id }
            }
        }, { new: true });

        res.json(thought);
    } catch (error) {
        res.json(error);
    }
}