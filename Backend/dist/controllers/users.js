"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = require("../models/users");
const sequelize_1 = require("sequelize");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, lastname, password, email, credential } = req.body;
        // Verificar si el usuario ya existe
        const userFind = yield users_1.User.findOne({
            where: { [sequelize_1.Op.or]: [{ email }, { credential }] }
        });
        if (userFind) {
            res.status(400).json({
                msg: `Usuario ya existe con el email => ${email} o credential => ${credential}`
            });
        }
        // Hashear la contraseña
        const passwordHash = yield bcrypt_1.default.hash(password, 10);
        // Crear usuario
        yield users_1.User.create({
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
    }
    catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
});
exports.registerUser = registerUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Buscar el usuario por email
        const user = yield users_1.User.findOne({ where: { email } });
        if (!user) {
            res.status(400).json({
                msg: `Usuario no existe con el email => ${email}`
            });
        }
        // Comparar la contraseña
        const passwordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordValid) {
            res.status(400).json({
                msg: `Correo o Password incorrecto.`
            });
        }
        // Generar token
        const token = jsonwebtoken_1.default.sign({ email }, process.env.SECRET_KEY || 'Jdz237797TH1dp7zjFzm', { expiresIn: '1h' } // ✅ Aquí está corregido
        );
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
});
exports.login = login;
