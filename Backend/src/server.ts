
import express, {Application} from 'express';
import sequelize from './database/connect';
import UserRouter from './routes/users';
import ProductRouter from './routes/product';
//import { User } from './models/users';
import { Product } from './models/product';
class Server{
    private app: Application;
    private port: string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.listen();
        this.midlewares();
        this.router();
        this.DBconnection();
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server is running on port: ', this.port);
        });
    }

    router(){
        this.app.use(UserRouter);
        this.app.use(ProductRouter);
    }

    midlewares(){
        this.app.use(express.json());
    }

    async DBconnection(){
        try {
            await sequelize.authenticate();
            //await User.sync({ force: true });
            //await Product.sync({ force: true });
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);      
        }
    }
}

export default Server;