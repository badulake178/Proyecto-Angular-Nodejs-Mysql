import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/users';

export const registerUser = async (req: Request, res: Response) => {
    //console.log(req.body);
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

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({where: {email: email}});

    if(!user){
        return res.json({
            message: 'User not found'
        });
    }

    return res.json({message: 'User found'});
    
}