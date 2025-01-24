import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/users';

export const register = async (req: Request, res: Response) => {

    const { name, lastname, password, email, credential} = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    User.create({
        name: name,
        lastname: lastname,
        password: passwordHash,
        email: email,
        credential: credential,
        status: 1,
    })

    res.json({
        message: 'User created successfully'
    });
};