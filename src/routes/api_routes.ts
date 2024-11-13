import { Router } from 'express';
import {
    findAllUsers,
    getSingleUserData,
    createUser,
    updateUserById,
    deleteUserById,
    addFriendToUser,
    deleteFriendFromUser,
    getAllThoughts,
    getSingleThoughtById,
    createThought,
    updateThoughtById,
    deleteThoughtById,
    createReaction,
    deleteReactionById
} from '../controllers/api_controllers.js';

const router = Router();


// GET all users
router.get('/users', findAllUsers);  // checked - working

// GET a single user by '_id' and populate thoughts and friend data
router.get('/users/:userId', getSingleUserData); // checked - review response object information

// POST a new user
router.post('/users', createUser); // checked - working

// PUT to update a user by '_id'
router.put('/users/:userId', updateUserById);  // checked - working

// DELETE to remove users by '_id''
router.delete('/users/:userId', deleteUserById);  // checked - working




// POST to add a new friend to a user's friend list
router.post('/users/:userId/friends/:friendId', addFriendToUser);  // checked - working

// DELETE to remove a friend from a user's friend list
router.delete('/users/:userId/friends/:friendId', deleteFriendFromUser);  // checked - working





// GET all thoughts
router.get('/thoughts', getAllThoughts); // checked - working

// GET to a single thought by its '_id'
router.get('/thoughts/:thoughtId', getSingleThoughtById);  // checked - working

// POST to create a single thought
router.post('/thoughts/:userId', createThought);  // checked - working

// PUT to update a thought by its '_id'
router.put('/thoughts/:thoughtId', updateThoughtById);  // checked - working

// DELETE to remove a thought by its '_id'
router.delete('/thoughts/:thoughtId', deleteThoughtById);  // checked - working

// POST to create a reaction stored in a single thought's 'reaction's' array
router.post('/thoughts/:thoughtId/reactions', createReaction);  // checked - working

// DELETE to pull and remove a reaction by its 'reactionId' value
router.delete('/thoughts/:thoughtId/reactions/:reactionId', deleteReactionById);

export default router;