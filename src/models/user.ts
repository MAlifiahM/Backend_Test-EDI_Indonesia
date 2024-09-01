import { db } from '../utils/db';

export interface IUser {
    id?: number;
    email: string;
    password: string;
    role: 'admin' | 'user';
    status: 'aktif' | 'tidak aktif';
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date | null;
}

export class UserModel {
    async findByEmail(email: string): Promise<IUser | null> {
        // @ts-ignore
        const [rows] = await db.query<IUser[]>('SELECT * FROM users WHERE email = ? AND deleted_at IS NULL', [email]);
        return rows.length ? rows[0] : null;
    }

    async createUser(user: IUser): Promise<void> {
        await db.query('INSERT INTO users (email, password, role, status) VALUES (?, ?, ?, ?)', [
            user.email,
            user.password,
            user.role,
            user.status,
        ]);
    }

    async updateUserStatus(userId: number, status: 'aktif' | 'tidak aktif'): Promise<void> {
        await db.query('UPDATE users SET status = ? WHERE id = ?', [status, userId]);
    }

    async deleteUser(userId: number): Promise<void> {
        await db.query('UPDATE users SET deleted_at = NOW() WHERE id = ?', [userId]);
    }
}
