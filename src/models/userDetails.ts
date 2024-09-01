import { db } from '../utils/db';
import {IUser} from "./user";

export interface IUserDetails {
    id?: number;
    user_id: number;
    posisi: string;
    nama: string;
    no_ktp: number;
    tempat_tanggal_lahir: string;
    jenis_kelamin: 'laki-laki' | 'perempuan';
    agama: string;
    golongan_darah: string;
    status: string;
    alamat_ktp: string;
    alamat_tinggal: string;
    no_telp: number;
    orang_terdekat: string;
    id_pendidikan?: number;
    id_pelatihan?: number;
    id_riwayat_pekerjaan?: number;
    skill: string;
    bersedia_ditempatkan: 'Ya' | 'Tidak';
    penghasilan: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date | null;
}

export interface IUserPelatihan {
    id? : number;
    user_id: number;
    nama_pelatihan: string;
    sertifikat: 'Ada' | 'Tidak';
    tahun_pelatihan: number;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date | null;
}

export interface IUserPendidikan {
    id? : number;
    user_id: number;
    pendidikan_terakhir: string;
    jurusan: string;
    nama_institusi: string;
    tahun_lulus: number;
    ipk: number;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date | null;
}

export interface IUserRPekerjaan {
    id? : number;
    user_id: number;
    nama_perusahaan: string;
    posisi_terakhir: string;
    pendapatan: number;
    tahun: number;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date | null;
}

export interface IUserDetailsResult {
    user: {
        posisi: string;
        nama: string;
        no_ktp: number;
        tempat_tanggal_lahir: string;
        jenis_kelamin: 'laki-laki' | 'perempuan';
        agama: string;
        golongan_darah: string;
        status: string;
        alamat_ktp: string;
        alamat_tinggal: string;
        no_telp: number;
        orang_terdekat: string;
        id_pendidikan?: number;
        id_pelatihan?: number;
        id_riwayat_pekerjaan?: number;
        skill: string;
        bersedia_ditempatkan: 'Ya' | 'Tidak';
        penghasilan: string;
    },
    riwayat_pekerjaan: Array<{
        id?: number;
        nama_perusahaan: string;
        posisi_terakhir: string;
        pendapatan: number;
        tahun: number;
    }>,
    riwayat_pendidikan: Array<{
        id?: number;
        pendidikan_terakhir: string;
        jurusan: string;
        nama_institusi: string;
        tahun_lulus: number;
        ipk: number;
    }>,
    riwayat_pelatihan: Array<{
        id?: number;
        nama_pelatihan: string;
        sertifikat: 'Ada' | 'Tidak';
        tahun_pelatihan: number;
    }>
}

export class UserDetailsModel {

    async createUserPendidikan(pendidikan: IUserPendidikan, user_id: number): Promise<void> {
        await db.query(
            'INSERT INTO user_pendidikan (user_id, pendidikan_terakhir, jurusan, nama_institusi, tahun_lulus, ipk) VALUES (?, ?, ?, ?, ?, ?)',
            [
                user_id,
                pendidikan.pendidikan_terakhir,
                pendidikan.jurusan,
                pendidikan.nama_institusi,
                pendidikan.tahun_lulus,
                pendidikan.ipk
            ]
        );
    }

    async updateUserPendidikan(pendidikan: IUserPendidikan, user_id: number): Promise<void> {
        await db.query(
            'UPDATE user_pendidikan SET pendidikan_terakhir = ?, jurusan = ?, nama_institusi = ?, tahun_lulus = ?, ipk = ? WHERE user_id = ? AND id = ?',
            [
                pendidikan.pendidikan_terakhir,
                pendidikan.jurusan,
                pendidikan.nama_institusi,
                pendidikan.tahun_lulus,
                pendidikan.ipk,
                user_id,
                pendidikan.id
            ]
        )
    }

    async getUserPendidikan(pendidikan_id: number, user_id: number): Promise<IUserPendidikan | null> {
        // @ts-ignore
        const result = await db.query<IUserPendidikan>(
            'SELECT * FROM user_pendidikan WHERE user_id = ? AND id = ?',
            [
                user_id,
                pendidikan_id
            ]
        );

        // @ts-ignore
        if (result.length === 0) {
            return null;
        }

        return result[0];
    }

    async createUserPelatihan(pelatihan: IUserPelatihan, user_id: number): Promise<void> {
        await db.query(
            'INSERT INTO user_pelatihan (user_id, nama_pelatihan, sertifikat, tahun_pelatihan) VALUES (?, ?, ?, ?)',
            [
                user_id,
                pelatihan.nama_pelatihan,
                pelatihan.sertifikat,
                pelatihan.tahun_pelatihan
            ]
        )
    }

    async updateUserPelatihan(pelatihan: IUserPelatihan, user_id: number): Promise<void> {
        await db.query(
            'UPDATE user_pelatihan SET nama_pelatihan = ? , sertifikat = ?, tahun_pelatihan = ? where id = ? AND user_id = ?',
            [
                pelatihan.nama_pelatihan,
                pelatihan.sertifikat,
                pelatihan.tahun_pelatihan,
                pelatihan.id,
                user_id
            ]
        )
    }

    async getUserPelatihan(pelatihan_id: number, user_id: number): Promise<IUserPelatihan | null> {
        // @ts-ignore
        const result = await db.query<IUserPelatihan>(
            'SELECT * FROM user_pelatihan WHERE user_id = ? AND id = ?',
            [
                user_id,
                pelatihan_id
            ]
        );

        // @ts-ignore
        if (result.length === 0) {
            return null;
        }

        return result[0];
    }

    async createUserPekerjaan(pekerjaan: IUserRPekerjaan, user_id: number): Promise<void> {
        console.log(pekerjaan)
        await db.query(
            'INSERT INTO user_riwayat_pekerjaan (user_id, nama_perusahaan, posisi_terakhir, pendapatan, tahun) VALUES (?, ?, ?, ?, ?)',
            [
                user_id,
                pekerjaan.nama_perusahaan,
                pekerjaan.posisi_terakhir,
                pekerjaan.pendapatan,
                pekerjaan.tahun
            ]
        );
    }

    async updateUserPekerjaan(pekerjaan: IUserRPekerjaan, user_id: number): Promise<void> {
        await db.query(
            'UPDATE user_riwayat_pekerjaan SET nama_perusahaan = ? , posisi_terakhir = ?, pendapatan = ?, tahun = ? WHERE id = ? AND user_id = ?',
            [
                pekerjaan.nama_perusahaan,
                pekerjaan.posisi_terakhir,
                pekerjaan.pendapatan,
                pekerjaan.tahun,
                pekerjaan.id,
                user_id
            ]
        )
    }

    async getUserPekerjaan(pekerjaan_id: number, user_id: number): Promise<IUserRPekerjaan | null> {
        // @ts-ignore
        const result = await db.query<IUserRPekerjaan>(
            'SELECT * FROM user_riwayat_pekerjaan WHERE user_id = ? AND id = ?',
            [
                user_id,
                pekerjaan_id
            ]
        );

        // @ts-ignore
        if (result.length === 0) {
            return null;
        }

        return result[0];
    }

    async deleteUserPekerjaan(pekerjaanId: number, user_id: number): Promise<void> {
        await db.query(
            'DELETE FROM user_riwayat_pekerjaan WHERE id = ? AND user_id = ?',
            [
                pekerjaanId,
                user_id
            ]
        )
    }

    async deleteUserPendidikan(pendidikanId: number, user_id: number): Promise<void> {
        await db.query(
            'DELETE FROM user_pendidikan WHERE id = ? AND user_id = ?',
            [
                pendidikanId,
                user_id
            ]
        )
    }

    async deleteUserPelatihan(pelatihanId: number, user_id: number): Promise<void> {
        await db.query(
            'DELETE FROM user_pelatihan WHERE id = ? AND user_id = ?',
            [
                pelatihanId,
                user_id
            ]
        )
    }

    async createUserDetails(details: IUserDetails, user_id: number): Promise<void> {
        await db.query(
            'INSERT INTO user_details (user_id, posisi, nama, no_ktp, tempat_tanggal_lahir, jenis_kelamin, agama, golongan_darah, status, alamat_ktp, alamat_tinggal, no_telp, orang_terdekat, skill, bersedia_ditempatkan, penghasilan) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                user_id,
                details.posisi,
                details.nama,
                details.no_ktp,
                details.tempat_tanggal_lahir,
                details.jenis_kelamin,
                details.agama,
                details.golongan_darah,
                details.status,
                details.alamat_ktp,
                details.alamat_tinggal,
                details.no_telp,
                details.orang_terdekat,
                details.skill,
                details.bersedia_ditempatkan,
                details.penghasilan,
            ]
        );
    }

    async updateUserDetails(userId: number, details: Partial<IUserDetails>): Promise<void> {
        const updates = Object.keys(details)
            .map((key) => `${key} = ?`)
            .join(', ');

        const values = [...Object.values(details), userId];

        await db.query(`UPDATE user_details SET ${updates} WHERE user_id = ?`, values);
    }

    async deleteUserDetails(userId: number): Promise<void> {
        await db.query('UPDATE user_details SET deleted_at = NOW() WHERE user_id = ?', [userId]);
    }

    async getUserDetailsByID(userId: number): Promise<IUserDetailsResult | null> {
        // @ts-ignore
        const [rows] = await db.query<IUserDetails[]>('SELECT * FROM user_details WHERE user_id = ? AND deleted_at IS NULL', [userId]);

        if (rows.length === 0) {
            return null;
        }

        const result: IUserDetailsResult = {
            user: {
                posisi: rows[0].posisi,
                nama: rows[0].nama,
                no_ktp: rows[0].no_ktp,
                tempat_tanggal_lahir: rows[0].tempat_tanggal_lahir,
                jenis_kelamin: rows[0].jenis_kelamin,
                agama: rows[0].agama,
                golongan_darah: rows[0].golongan_darah,
                status: rows[0].status,
                alamat_ktp: rows[0].alamat_ktp,
                alamat_tinggal: rows[0].alamat_tinggal,
                no_telp: rows[0].no_telp,
                orang_terdekat: rows[0].orang_terdekat,
                id_pendidikan: rows[0].id_pendidikan,
                id_pelatihan: rows[0].id_pelatihan,
                id_riwayat_pekerjaan: rows[0].id_riwayat_pekerjaan,
                skill: rows[0].skill,
                bersedia_ditempatkan: rows[0].bersedia_ditempatkan,
                penghasilan: rows[0].penghasilan
            },
            riwayat_pekerjaan: [],
            riwayat_pelatihan: [],
            riwayat_pendidikan: []
        }

        //@ts-ignore
        const [rows_pekerjaan] = await db.query<IUserRPekerjaan[]>('SELECT * FROM user_riwayat_pekerjaan WHERE user_id = ? AND deleted_at IS NULL', [userId]);

        if (rows_pekerjaan.length !== 0) {
            for (const pekerjaan of rows_pekerjaan) {
                // @ts-ignore
                result.riwayat_pekerjaan.push({
                    id: pekerjaan.id,
                    nama_perusahaan: pekerjaan.nama_perusahaan,
                    posisi_terakhir: pekerjaan.posisi_terakhir,
                    pendapatan: pekerjaan.pendapatan,
                    tahun: pekerjaan.tahun
                });
            }
        }

        //@ts-ignore
        const [rows_pelatihan] = await db.query<IUserPelatihan[]>('SELECT * FROM user_pelatihan WHERE user_id = ? AND deleted_at IS NULL', [userId]);

        if (rows_pelatihan.length !== 0) {
            for (const pelatihan of rows_pelatihan) {
                // @ts-ignore
                result.riwayat_pelatihan.push({
                    id: pelatihan.id,
                    nama_pelatihan: pelatihan.nama_pelatihan,
                    sertifikat: pelatihan.sertifikat,
                    tahun_pelatihan: pelatihan.tahun_pelatihan
                });
            }
        }

        //@ts-ignore
        const [rows_pendidikan] = await db.query<IUserPendidikan[]>('SELECT * FROM user_pendidikan WHERE user_id = ? AND deleted_at IS NULL', [userId]);

        if (rows_pendidikan.length !== 0) {
            for (const pendidikan of rows_pendidikan) {
                // @ts-ignore
                result.riwayat_pendidikan.push({
                    id: pendidikan.id,
                    pendidikan_terakhir: pendidikan.pendidikan_terakhir,
                    jurusan: pendidikan.jurusan,
                    nama_institusi: pendidikan.nama_institusi,
                    tahun_lulus: pendidikan.tahun_lulus,
                    ipk: pendidikan.ipk
                });
            }
        }

        return result;
    }

    async getAllUser(): Promise<IUser[] | null> {
        //@ts-ignore
        const [rows] = await db.query<IUser[]>(
            "SELECT u.id as user_id, ud.nama, ud.tempat_tanggal_lahir, ud.posisi, u.status FROM users u LEFT JOIN user_details ud ON u.id = ud.user_id WHERE ud.deleted_at IS NULL AND u.role = 'user' AND u.deleted_at IS NULL"
        )

        console.log(rows)

        if (rows.length === 0) {
            return null
        }

        return rows
    }
}
