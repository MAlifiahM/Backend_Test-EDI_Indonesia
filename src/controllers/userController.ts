import { Request, Response } from 'express';
import { UserModel } from '../models/user';
import { UserDetailsModel} from '../models/userDetails';

export class UserController {
    async listUsers(req: Request, res: Response) {
        const userModel = new UserDetailsModel();
        const users = await userModel.getAllUser();

        if (!users) {
            return res.status(404).json({ message: 'Users not found' });
        }

        res.status(200).json(users);
    }

    async updateUserStatus(req: Request, res: Response) {
        const { userId } = req.params;
        const { status } = req.body;
        const userModel = new UserModel();

        try {
            if (!status) {
                return res.status(400).json({ message: 'Status is required' });
            }

            if (status !== 'aktif' && status !== 'tidak aktif') {
                return res.status(400).json({ message: 'Invalid status' });
            }

            await userModel.updateUserStatus(parseInt(userId), status);
            res.status(200).json({ message: 'User status updated' });
        } catch (error: any) {
            res.status(500).json({ message: 'Failed to update user status', error: error.message });
        }

    }

    async deleteUser(req: Request, res: Response) {
        const { userId } = req.params;
        const userModel = new UserModel();

        await userModel.deleteUser(parseInt(userId));
        res.status(200).json({ message: 'User deleted' });
    }

    async createUserDetails(req: Request, res: Response) {
        const userDetailsModel = new UserDetailsModel();
        
        //@ts-ignore
        const userId = req.user?.id;
        try {
            const body: any = req.body

            let userDetails = await userDetailsModel.getUserDetailsByID(userId);
            if (userDetails) {
                return res.status(400).json({message: 'User details already exist'});
            }

            for (let i = 0; i < body.pendidikan_terakhir.length; i++) {
                await userDetailsModel.createUserPendidikan(body.pendidikan_terakhir[i], userId);
            }

            for (let i = 0; i < body.riwayat_pelatihan.length; i++) {
                await userDetailsModel.createUserPelatihan(body.riwayat_pelatihan[i], userId);
            }

            for (let i = 0; i < body.riwayat_pekerjaan.length; i++) {
                await userDetailsModel.createUserPekerjaan(body.riwayat_pekerjaan[i], userId);
            }

            await userDetailsModel.createUserDetails(body.user, userId);

            res.status(201).json({ message: 'User details created successfully' });
        } catch (error :any) {
            res.status(500).json({ message: 'Failed to create user details', error: error.message });
        }
    }

    async getUserDetails(req: Request, res: Response) {
        const userDetailsModel = new UserDetailsModel();

        let userId: number;

        if (!req.params.userId) {
            //@ts-ignore
            userId = req.user?.id;
        } else {
            userId = parseInt(req.params.userId);
        }

        try {
            const userDetails = await userDetailsModel.getUserDetailsByID(userId!);

            if (!userDetails) {
                return res.status(404).json({ message: 'User details not found' });
            }

            res.status(200).json(userDetails);
        } catch ( error:any ) {
            res.status(500).json({ message: 'Failed to retrieve user details', error: error.message });
        }
    }

    async updateUserDetails(req: Request, res: Response) {
        const userDetailsModel = new UserDetailsModel();

        let userId: number;

        if (!req.params.userId) {
            //@ts-ignore
            userId = req.user?.id;
        } else {
            userId = parseInt(req.params.userId);
        }

        try {
            const body: any = req.body

            let userDetails = await userDetailsModel.getUserDetailsByID(userId);
            if (!userDetails) {
                return res.status(404).json({message: 'User details not found'});
            }

            for (let i = 0; i < body.pendidikan_terakhir.length; i++) {
                const check : any = await userDetailsModel.getUserPendidikan(body.pendidikan_terakhir[i].id, userId);

                if ( check.length === 0 ) {
                    await userDetailsModel.createUserPendidikan(body.pendidikan_terakhir[i], userId);
                }

                await userDetailsModel.updateUserPendidikan(body.pendidikan_terakhir[i], userId);
            }

            for (let i = 0; i < body.riwayat_pelatihan.length; i++) {
                const check : any = await userDetailsModel.getUserPelatihan(body.riwayat_pelatihan[i].id, userId);

                if ( check.length === 0 ) {
                    await userDetailsModel.createUserPelatihan(body.riwayat_pelatihan[i], userId);
                }

                await userDetailsModel.updateUserPelatihan(body.riwayat_pelatihan[i], userId);
            }

            for (let i = 0; i < body.riwayat_pekerjaan.length; i++) {
                const check : any = await userDetailsModel.getUserPekerjaan(body.riwayat_pekerjaan[i].id, userId);

                if ( check.length === 0 ) {
                    await userDetailsModel.createUserPekerjaan(body.riwayat_pekerjaan[i], userId);
                }

                await userDetailsModel.updateUserPekerjaan(body.riwayat_pekerjaan[i], userId);
            }

            await userDetailsModel.updateUserDetails(userId, body.user);

            res.status(202).json({ message: 'User details updated successfully' });
        } catch (error :any) {
            res.status(500).json({ message: 'Failed to update user details', error: error.message });
        }
    }

    async deleteUserPekerjaan(req: Request, res: Response) {
        const { pekerjaanId } = req.params;

        let userId: number;

        if (!req.params.userId) {
            //@ts-ignore
            userId = req.user?.id;
        } else {
            userId = parseInt(req.params.userId);
        }

        const userDetailsModel = new UserDetailsModel();

        const check : any = await userDetailsModel.getUserPekerjaan(parseInt(pekerjaanId), userId);

        if (check.length === 0) {
            return res.status(404).json({ message: 'User pekerjaan not found' });
        }

        await userDetailsModel.deleteUserPekerjaan(parseInt(pekerjaanId), userId);
        res.status(200).json({ message: 'User pekerjaan deleted' });
    }

    async deleteUserPendidikan(req: Request, res: Response) {
        const { pendidikanId } = req.params;

        let userId: number;

        if (!req.params.userId) {
            //@ts-ignore
            userId = req.user?.id;
        } else {
            userId = parseInt(req.params.userId);
        }

        const userDetailsModel = new UserDetailsModel();

        const check : any = await userDetailsModel.getUserPendidikan(parseInt(pendidikanId), userId);

        if (check.length === 0) {
            return res.status(404).json({ message: 'User pendidikan not found' });
        }

        await userDetailsModel.deleteUserPendidikan(parseInt(pendidikanId), userId);
        res.status(200).json({ message: 'User pendidikan deleted' });
    }

    async deleteUserPelatihan(req: Request, res: Response) {
        const { pelatihanId } = req.params;

        let userId: number;

        if (!req.params.userId) {
            //@ts-ignore
            userId = req.user?.id;
        } else {
            userId = parseInt(req.params.userId);
        }

        const userDetailsModel = new UserDetailsModel();

        const check : any = await userDetailsModel.getUserPelatihan(parseInt(pelatihanId), userId);

        if (check.length === 0) {
            return res.status(404).json({ message: 'User pelatihan not found' });
        }

        await userDetailsModel.deleteUserPelatihan(parseInt(pelatihanId), userId);
        res.status(200).json({ message: 'User pelatihan deleted' });
    }

    async deleteUserDetails(req: Request, res: Response) {
        const { userId } = req.params;
        const userDetailsModel = new UserDetailsModel();

        await userDetailsModel.deleteUserDetails(parseInt(userId));
        res.status(200).json({ message: 'User details deleted' });
    }
}
