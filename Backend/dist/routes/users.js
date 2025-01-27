"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const users_2 = require("../controllers/users");
const router = (0, express_1.Router)();
router.post('/api/v1/user/register', users_1.registerUser);
router.post('/api/v1/user/login', users_2.login);
exports.default = router;
