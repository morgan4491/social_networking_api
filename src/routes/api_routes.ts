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
    deleteThoughtById
} from '../controllers/api_controllers';

const router = Router();


// GET all users
router.get('/users', findAllUsers);

// GET a single user by '_id' and populate thoughts and friend data
router.get('/users/:userId', getSingleUserData);

// POST a new user
router.post('/users', createUser);

// PUT to update a user by '_id'
router.put('/users/:userId', updateUserById);

// DELETE to remove users by '_id''
router.delete('/users/:userId', deleteUserById);




// POST to add a new friend to a user's friend list
router.post('/api/users/:userId/friends/:friendId', addFriendToUser);

// DELETE to remove a friend from a user's friend list
router.delete('/api/users/:userId/friends/:friendId', deleteFriendFromUser);





// GET all thoughts
router.get('/thoughts', getAllThoughts);

// GET to a single thought by its '_id'
router.get('/thoughts/:thoughtsId', getSingleThoughtById);

// POST to create a single thought
router.post('/thoughts/:userId', createThought);

// PUT to update a thought by its '_id'
router.put('/thoughts/:thoughtsId', updateThoughtById);

// DELETE to remove a thought by its '_id'
router.delete('/thoughts/:thoughtsId', deleteThoughtById);

export default router;