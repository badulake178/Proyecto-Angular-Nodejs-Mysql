import { NextFunction, Request, Response} from "express"
import jwt from 'jsonwebtoken'

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers['authorization'];
    //console.log(headerToken);
    if(headerToken && headerToken.startsWith('Bearer')){
        try {
            const token = headerToken.slice(7);
            jwt.verify(token, process.env.SECRET_KEY || "Jdz237797TH1dp7zjFzm");

            next();
            
        } catch (error) {
            res.status(401).json({
                msg: `Token Denegado.`
            })
        }
        

    }
    else{
        res.status(401).json({mssg: "Unauthorized"})
    }
    
    
}

export default validateToken;