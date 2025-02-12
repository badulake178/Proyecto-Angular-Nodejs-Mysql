import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/users';
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, lastname, password, email, credential } = req.body;

        // Verificar si el usuario ya existe
        const userFind = await User.findOne({
            where: { [Op.or]: [{ email }, { credential }] }
        });

        if (userFind) {
            res.status(400).json({
                msg: `Usuario ya existe con el email => ${email} o credential => ${credential}`
            });
        }

        // Hashear la contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        // Crear usuario
        await User.create({
            name,
            lastname,
            password: passwordHash,
            email,
            credential,
            status: 1,
        });

        res.status(201).json({
            message: 'User created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Buscar el usuario por email
        const user: any = await User.findOne({ where: { email } });

        if (!user) {
            res.status(400).json({
                msg: `Usuario no existe con el email => ${email}`
            });
        }

        // Comparar la contraseña
        const passwordValid = await bcrypt.compare(password, user.password);

        if (!passwordValid) {
            res.status(400).json({
                msg: `Correo o Password incorrecto.`
            });
        }

        // Generar token
        const token = jwt.sign(
            { email },
            process.env.SECRET_KEY || 'Jdz237797TH1dp7zjFzm',
            { expiresIn: '1h' } // ✅ Aquí está corregido
        );

         res.json({ token });
    } catch (error) {
         res.status(500).json({ error: 'Error en el servidor' });
    }
};
