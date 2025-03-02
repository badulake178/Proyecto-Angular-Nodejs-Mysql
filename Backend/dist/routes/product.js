"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("../controllers/product");
const validateToken_1 = __importDefault(require("./validateToken"));
const router = (0, express_1.Router)();
router.post('/api/v1/product/registerProduct', product_1.registerProduct);
router.get('/api/v1/product/getAllProduct', validateToken_1.default, product_1.getProducts);
exports.default = router;
