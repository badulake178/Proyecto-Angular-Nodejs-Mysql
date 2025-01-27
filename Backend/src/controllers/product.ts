import { Request, Response } from 'express';
import { Product } from '../models/product';

export const registerProduct = async (req: Request, res: Response) => {
    //console.log(req.body);
    const { name, description} = req.body;
    
    Product.create({
        name: name,
        description: description,
        status: 1,
    })
    res.json({
        message: 'Product created successfully'
    });
};