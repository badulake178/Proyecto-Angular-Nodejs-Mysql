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
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(req.body);
    const { name, lastname, password, email, credential } = req.body;
    const passwordHash = yield bcrypt_1.default.hash(password, 10);
    users_1.User.create({
        name: name,
        lastname: lastname,
        password: passwordHash,
        email: email,
        credential: credential,
        status: 1,
    });
    res.json({
        message: 'User created successfully'
    });
});
exports.registerUser = registerUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield users_1.User.findOne({ where: { email: email } });
    if (!user) {
        return res.json({
            message: 'User not found'
        });
    }
    return res.json({ message: 'User found' });
});
exports.login = login;
