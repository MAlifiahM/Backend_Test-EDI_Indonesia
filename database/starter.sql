CREATE DATABASE IF NOT EXISTS EDI_Indonesia;

USE EDI_Indonesia;

CREATE TABLE IF NOT EXISTS users (
     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
     email VARCHAR(255) NOT NULL,
     password VARCHAR(255) NOT NULL,
     role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
     status ENUM('aktif', 'tidak aktif') NOT NULL DEFAULT 'tidak aktif',
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     deleted_at TIMESTAMP NULL DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS user_details (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    posisi VARCHAR(255) NOT NULL,
    nama VARCHAR(255) NOT NULL,
    no_ktp BIGINT NOT NULL UNIQUE,
    tempat_tanggal_lahir VARCHAR(255) NOT NULL,
    jenis_kelamin ENUM('laki-laki', 'perempuan') NOT NULL,
    agama VARCHAR(255) NOT NULL,
    golongan_darah VARCHAR(5) NOT NULL,
    status VARCHAR(50) NOT NULL,
    alamat_ktp VARCHAR(255) NOT NULL,
    alamat_tinggal VARCHAR(255) NOT NULL,
    no_telp BIGINT NOT NULL,
    orang_terdekat VARCHAR(255) NOT NULL,
    skill VARCHAR(255) NOT NULL,
    bersedia_ditempatkan ENUM('Ya', 'Tidak') NOT NULL,
    penghasilan VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS user_pendidikan (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    pendidikan_terakhir VARCHAR(255) NOT NULL,
    jurusan VARCHAR(255) NOT NULL,
    nama_institusi VARCHAR(255) NOT NULL,
    tahun_lulus INT NOT NULL,
    ipk INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS user_pelatihan (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    nama_pelatihan VARCHAR(255) NOT NULL,
    sertifikat ENUM('Ada', 'Tidak') NOT NULL,
    tahun_pelatihan INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS user_riwayat_pekerjaan (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    nama_perusahaan VARCHAR(255) NOT NULL,
    posisi_terakhir VARCHAR(255) NOT NULL,
    pendapatan VARCHAR(255) NOT NULL,
    tahun INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);