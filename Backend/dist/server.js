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
const express_1 = __importDefault(require("express"));
const connect_1 = __importDefault(require("./database/connect"));
const users_1 = __importDefault(require("./routes/users"));
const product_1 = __importDefault(require("./routes/product"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        this.listen();
        this.midlewares();
        this.router();
        this.DBconnection();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Server is running on port: ', this.port);
        });
    }
    router() {
        this.app.use(users_1.default);
        this.app.use(product_1.default);
    }
    midlewares() {
        this.app.use(express_1.default.json());
    }
    DBconnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connect_1.default.authenticate();
                //await User.sync({ force: true });
                //await Product.sync({ force: true });
                console.log('Connection has been established successfully.');
            }
            catch (error) {
                console.error('Unable to connect to the database:', error);
            }
        });
    }
}
exports.default = Server;
