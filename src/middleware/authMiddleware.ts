import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string, id: number };
        const userModel = new UserModel();
        const user = await userModel.findByEmail(decoded.email);

        if (!user) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // @ts-ignore
        req.user = user;
        next();
    } catch (error) {
        console.log("error : ", error)
        res.status(401).json({ message: 'Not authorized' });
    }
};

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }

    next();
};
