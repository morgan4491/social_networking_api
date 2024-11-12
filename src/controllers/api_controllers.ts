import { Request, Response } from 'express';
import User from '../models/User.js';
import Thought from '../models/Thought.js';

export async function findAllUsers(_: Request, res: Response) {
    const users = await User.find();

    res.json(users);
}

export async function getSingleUserData(req: Request, res: Response) {
    const user_id = req.body.user_id;

    const user = await User.findById(user_id).populate({
        path: 'thoughts',
        select: 'thoughText'
    });

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
    }
}

export async function updateUserById(req: Request, res: Response) {

}

export async function deleteUserById(req: Request, res: Response) {

}

export async function addFriendToUser(req: Request, res: Response) {

}

export async function deleteFriendFromUser(req: Request, res: Response) {

}

export async function getAllThoughts(req: Request, res: Response) {
    const thoughts = await Thought.find();

    res.json(thoughts);
}

export async function getSingleThoughtById(req: Request, res: Response) {
    const thoughts = await Thought.find
}

export async function createThought(req: Request, res: Response) {

}

export async function updateThoughtById(req: Request, res: Response) {

}

export async function deleteThoughtById(req: Request, res: Response) {

}