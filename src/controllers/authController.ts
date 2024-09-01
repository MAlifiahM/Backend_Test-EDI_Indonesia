import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user';

export class AuthController {
    async register(req: Request, res: Response) {
        const { email, password } = req.body;
        const userModel = new UserModel();
        const existingUser = await userModel.findByEmail(email);

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            email,
            password: hashedPassword,
            role: "user",
            status: 'tidak aktif',
        };

        // @ts-ignore
        await userModel.createUser(user);

        res.status(201).json({ message: 'User created successfully' });
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const userModel = new UserModel();
        const user = await userModel.findByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ email: user.email, id: user.id }, process.env.JWT_SECRET!, { expiresIn: '10h' });
        res.status(200).json({ token });
    }
}
