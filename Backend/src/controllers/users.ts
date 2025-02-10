import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/users';
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response) => {
    //console.log(req.body);
    const { name, lastname, password, email, credential} = req.body;

    const userFind = User.findOne({where: {[Op.or]: {email: email, credential: credential}}})

    if(!userFind){
        return res.status(400).json({
            msg: `Usuario ya existe en el email => ${email} o credential => ${credential}`
        })
    }
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

    const {  email, password} = req.body;

    console.log(req.body.password);
    

    const user:any = await User.findOne({where: {email: email}});

    console.log(user.password);
    

    if(!user){
        return res.status(400).json({
            msg: `Usuario no existe con el email=> ${email}`
        });
    }


    

    const passwordValid = await bcrypt.compare(password, user.password  );

    if(!passwordValid){
        return res.status(400).json({
            msg: `Correo o Password incorrecto.`
        })
    }
    const token = jwt.sign({email: email}, process.env.SECRET_KEY || 'Jdz237797TH1dp7zjFzm')

    res.json({
        token: token
    })
}