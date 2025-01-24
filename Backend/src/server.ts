
import express, {Application} from 'express';
import sequelize from './database/connect';
import UserRouter from './routes/users';
import { User } from './models/users';
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
    }

    midlewares(){
        this.app.use(express.json());
    }

    async DBconnection(){
        try {
            //await sequelize.authenticate();
            await User.sync({ force: true });
            console.log('Dthe table for user model was just (re)created!');
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);      
        }
    }
}

export default Server;