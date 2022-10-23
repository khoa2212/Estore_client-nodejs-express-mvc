USE sys;
DROP DATABASE IF EXISTS CLOTHESSTOREWEB;
CREATE DATABASE IF NOT EXISTS CLOTHESSTOREWEB;
USE CLOTHESSTOREWEB;

CREATE TABLE users (
	USER_ID char(36),
    TEN nvarchar(10),
    HO nvarchar(10),
    EMAIL nchar(255),
    SO_BANKING nchar(20) DEFAULT '0',
    PASS nchar(255),
    LA_ADMIN bool DEFAULT false,
    
    KICH_HOAT bool DEFAULT false,
    KHOA bool DEFAULT false,
    TOKEN nchar(255) DEFAULT '0',
    NGAY_HET_HAN_TOKEN datetime DEFAULT CURRENT_TIMESTAMP,
    
    constraint PK_USERS
    primary key(USER_ID)
);

CREATE TABLE kichthuoc (
	QUANAO_ID char(36),
    KICH_THUOC nchar(10),
    
    constraint PK_KICHTHUOC
    primary key(QUANAO_ID, KICH_THUOC)
);

CREATE TABLE loai (
	LOAI_ID char(36),
    TEN_LOAI nvarchar(100),
    
    constraint PK_LOAI
    primary key(LOAI_ID)
);

CREATE TABLE thuonghieu (
	THUONGHIEU_ID char(36),
    TEN_THUONG_HIEU nvarchar(100),
	
    constraint PK_THUONGHIEU
    primary key(THUONGHIEU_ID)
);

CREATE TABLE quanao (
	QUANAO_ID char(36),
    LOAI_ID char(36),
    MAU nvarchar(100),
    THUONGHIEU_ID char(36),
    GIA double,
    SO_LUONG int,
    GIOI_TINH nvarchar(100),
    DA_XOA bool default false,
    LINK nvarchar(2083),
    
    constraint PK_QUANAO
    primary key(QUANAO_ID)
);

CREATE TABLE giohang (
	GIOHANG_ID char(36),
    USER_NAME nvarchar(50),
	USER_ID char(36),
    TRANG_THAI int,
    
    constraint PK_GIOHANG
    primary key(GIOHANG_ID)
);

CREATE TABLE ct_giohang (
	GIOHANG_ID char(36),
    QUANAO_ID char(36),
    SO_LUONG int,
    
    constraint PK_CT_GIOHANG
    primary key(GIOHANG_ID, QUANAO_ID)
);

CREATE TABLE hoadon (
	HOADON_ID char(36),
    GIOHANG_ID char(36),
	NGAY_MUA date,
    TONG_TIEN double,
    SDT nchar(10),
    DIA_CHI nvarchar(50),
    
    constraint PK_HOADON
    primary key(HOADON_ID)
);

CREATE TABLE ct_hoadon (
	HOADON_ID char(36),
    QUANAO_ID char(36),
    SO_LUONG_MUA int,
    
    constraint PK_CT_HOADON
    primary key(HOADON_ID, QUANAO_ID)
);
	
CREATE TABLE binhluan (
	BINHLUAN_ID char(36),
	QUANAO_ID char(36),
    USERNAME nvarchar(50),
    DIEM int,
    NOI_DUNG nvarchar(200),
    
    constraint PK_BINHLUAN
    primary key(BINHLUAN_ID)
);

ALTER TABLE quanao
ADD
	CONSTRAINT FK_QUANAO_LOAI
    foreign key(LOAI_ID)
    references loai(LOAI_ID);

ALTER table quanao
ADD
	CONSTRAINT FK_QUANAO_THUONGHIEU
    foreign key(THUONGHIEU_ID)
    references thuonghieu(THUONGHIEU_ID);

ALTER TABLE kichthuoc
ADD
	CONSTRAINT FK_KICHTHUOC_QUANAO
    FOREIGN KEY(QUANAO_ID)
    REFERENCES quanao(QUANAO_ID);
    
ALTER TABLE giohang
ADD
	constraint FK_GIOHANG_USERS
    foreign key(USER_ID)
    references users(USER_ID);

ALTER TABLE ct_giohang
ADD
	CONSTRAINT FK_CT_GIOHANG_GIOHANG
    foreign key(GIOHANG_ID)
    references giohang(GIOHANG_ID);
    
ALTER TABLE ct_giohang
ADD
	CONSTRAINT FK_CT_GIOHANG_QUANAO
    foreign key(QUANAO_ID)
    references quanao(QUANAO_ID);
    
ALTER TABLE hoadon
ADD
	CONSTRAINT FK_HOADON_GIOHANG
    foreign key(GIOHANG_ID)
    references giohang(GIOHANG_ID);

ALTER TABLE ct_hoadon
ADD
	constraint FK_CT_HOADON_HOADON
    foreign key(HOADON_ID)
    references hoadon(HOADON_ID);
    
ALTER TABLE ct_hoadon
ADD
	constraint FK_CT_HOADON_QUANAO
    foreign key(QUANAO_ID)
    references quanao(QUANAO_ID);
    
ALTER TABLE binhluan
ADD
	constraint FK_BINHLUAN_QUANAO
    foreign key(QUANAO_ID)
    references quanao(QUANAO_ID);


INSERT users (USER_ID, TEN, HO, EMAIL, SO_BANKING, PASS, LA_ADMIN, KICH_HOAT)
VALUES('US001', 'JONH', 'NGUYEN', 'jonh@gmail.com', '010101', '$2b$10$vUxyKu7A02A40L67UTC6qO6F2yKVmrY49vL5TyJKUr2cFmlAT2GGa', true, true),
('US002', 'JADE', 'TRAN', 'jade@gmail.com', '020202', '$2b$10$vUxyKu7A02A40L67UTC6qO6F2yKVmrY49vL5TyJKUr2cFmlAT2GGa', false, true),
('US003', 'TRI', 'NGUYEN', 'tri@Ggmail.com', '030303', '$2b$10$vUxyKu7A02A40L67UTC6qO6F2yKVmrY49vL5TyJKUr2cFmlAT2GGa', false, true),
('US004', 'TIM', 'DANG', 'tim@gmail.com', '040404', '$2b$10$vUxyKu7A02A40L67UTC6qO6F2yKVmrY49vL5TyJKUr2cFmlAT2GGa', false, true),
('US005', 'DUNG', 'LE', 'dung@gmail.com', '050505', '$2b$10$vUxyKu7A02A40L67UTC6qO6F2yKVmrY49vL5TyJKUr2cFmlAT2GGa', false, true),
('US006', 'MAI', 'NGUYEN', 'mai@gmail.com', '060606', '$2b$10$vUxyKu7A02A40L67UTC6qO6F2yKVmrY49vL5TyJKUr2cFmlAT2GGa', false, true),
('US007', 'HANH', 'TRAN', 'hanh@gmail.com', '070707', '$2b$10$vUxyKu7A02A40L67UTC6qO6F2yKVmrY49vL5TyJKUr2cFmlAT2GGa', true, true),
('US008', 'KIM', 'NGUYEN', 'kim@gmail.com', '080808', '$2b$10$vUxyKu7A02A40L67UTC6qO6F2yKVmrY49vL5TyJKUr2cFmlAT2GGa', false, true),
('US009', 'PHUONG', 'LE', 'phuong@gmail.com', '090909', '$2b$10$vUxyKu7A02A40L67UTC6qO6F2yKVmrY49vL5TyJKUr2cFmlAT2GGa', false, true),
('US010', 'MANH', 'PHAM', 'manh@gmail.com', '010010010', '$2b$10$vUxyKu7A02A40L67UTC6qO6F2yKVmrY49vL5TyJKUr2cFmlAT2GGa', true, true),
('US011', 'VY', 'LE', 'vy@gmail.com', '011011011', '$2b$10$vUxyKu7A02A40L67UTC6qO6F2yKVmrY49vL5TyJKUr2cFmlAT2GGa', true, true),
('US012', 'HAI', 'NAM', 'hai@gmail.com', '012012012', '$2b$10$vUxyKu7A02A40L67UTC6qO6F2yKVmrY49vL5TyJKUr2cFmlAT2GGa', true, true),
('US013', 'NAM', 'NGUYEN', 'nam@gmail.com', '013013013', '$2b$10$vUxyKu7A02A40L67UTC6qO6F2yKVmrY49vL5TyJKUr2cFmlAT2GGa', true, true),
('US014', 'NGOC', 'TRAN', 'ngoc@gmail.com', '014014014', '$2b$10$vUxyKu7A02A40L67UTC6qO6F2yKVmrY49vL5TyJKUr2cFmlAT2GGa', true, true),
('US015', 'LY', 'PHAM', 'ly@gmail.com', '015015015', '$2b$10$vUxyKu7A02A40L67UTC6qO6F2yKVmrY49vL5TyJKUr2cFmlAT2GGa', true, true);

INSERT loai
VALUES('L001', N'Sơ mi'),
('L002', N'Áo thun'),
('L003', N'Đầm'),
('L004', N'Váy'),
('L005', N'Hoodies'),
('L006', N'Áo khoác'),
('L007', N'Vest'),
('L008', N'Quần short'),
('L009', N'Áo polo');

INSERT thuonghieu
VALUES('TH001', 'Louis vouton'),
('TH002', 'Chanel'),
('TH003', 'Hermes'),
('TH004', 'Gucci'),
('TH005', 'Versace'),
('TH006', 'Prada'),
('TH007', 'Dior'),
('TH008', 'Burberry'),
('TH009', 'Fendi');

INSERT quanao
VALUES('QA001', 'L001', N'trắng', 'TH001', 100000, 100, N'nam', false, 'https://i.postimg.cc/bvcV6rxH/p-1.png'),
('QA002', 'L001', N'xanh', 'TH002', 200000, 100, N'nam', false, 'https://i.postimg.cc/8c5ZF6GD/p-2.png'),
('QA003', 'L002', N'trắng', 'TH003', 300000, 100, N'nam', false, 'https://i.postimg.cc/9fg1qBmM/p-3.png'),
('QA004', 'L003', N'đen', 'TH004', 400000, 100, N'nữ', false, 'https://i.postimg.cc/PxLyb8JM/p-4.jpg'),
('QA005', 'L003', N'đỏ', 'TH004', 500000, 100, N'nữ', false, 'https://i.postimg.cc/kMbwB8kJ/p-5.png'),
('QA006', 'L004', N'đen', 'TH005', 500000, 100, N'nữ', false, 'https://i.postimg.cc/9FHbT0hG/p-6.png'),
('QA007', 'L004', N'trắng', 'TH005', 500000, 100, N'nữ', false, 'https://i.postimg.cc/dtRB9Fsg/p-7.png'),
('QA008', 'L005', N'xanh', 'TH005', 500000, 100, N'nữ', false, 'https://i.postimg.cc/vmKLmHhx/p-8.png'),
('QA009', 'L005', N'trắng', 'TH005', 500000, 100, N'nam', false, 'https://i.postimg.cc/hjxxP8hN/p-9.png'),
('QA010', 'L006', N'nâu', 'TH006', 550000, 100, N'nam', false, 'https://i.postimg.cc/15G7b9Bb/p-10.png'),
('QA011', 'L006', N'đen', 'TH006', 514000, 100, N'nữ', false, 'https://i.postimg.cc/nhTRc06k/p-11.png'),
('QA012', 'L006', N'trắng', 'TH006', 600000, 100, N'nam', false, 'https://i.postimg.cc/yYHvmMKj/p-12.png'),
('QA013', 'L006', N'đỏ', 'TH006', 720000, 100, N'nam', false, 'https://i.postimg.cc/ZKXYsxfw/p-13.png'),
('QA014', 'L006', N'cam', 'TH006', 102000, 100, N'nam', false, 'https://i.postimg.cc/W4w23Lsy/p-14.png'),
('QA015', 'L007', N'đen', 'TH007', 560000, 100, N'nam', false, 'https://i.postimg.cc/Y9XM66Gf/p-15.png'),
('QA016', 'L007', N'trắng', 'TH007', 920000, 100, N'nam', false, 'https://i.postimg.cc/NjhYkfMV/p-16.png'),
('QA017', 'L007', N'xanh', 'TH007', 310000, 100, N'nam', false, 'https://i.postimg.cc/FKp4vyZ5/p-17.png'),
('QA018', 'L007', N'đỏ', 'TH007', 4150000, 100, N'nữ', false, 'https://i.postimg.cc/t4t0d38Z/p-18.png'),
('QA019', 'L007', N'nâu', 'TH007', 125000, 100, N'nữ', false, 'https://i.postimg.cc/tgXKB1Hr/p-19.png'),
('QA020', 'L008', N'đen', 'TH008', 3206000, 100, N'nam', false, 'https://i.postimg.cc/8Ctq91pT/p-20.png'),
('QA021', 'L008', N'trắng', 'TH008', 789000, 100, N'nam', false, 'https://i.postimg.cc/MHjNnVyG/p-21.png'),
('QA022', 'L008', N'đỏ', 'TH008', 132000, 100, N'nam', false, 'https://i.postimg.cc/qgVYyqLx/p-22.png'),
('QA023', 'L008', N'xanh', 'TH008', 450000, 100, N'nam', false, 'https://i.postimg.cc/dQkV2f6h/p-23.png'),
('QA024', 'L008', N'cam', 'TH008', 642000, 100, N'nam', false, 'https://i.postimg.cc/c1p4XckX/p-24.png'),
('QA025', 'L009', N'trắng', 'TH009', 529000, 100, N'nam', false, 'https://i.postimg.cc/0yx5qysS/p-25.png'),
('QA026', 'L009', N'đen', 'TH009', 412000, 100, N'nam', false, 'https://i.postimg.cc/Dwgvf3vM/p-26.png'),
('QA027', 'L009', N'xanh', 'TH009', 311000, 100, N'nam', false, 'https://i.postimg.cc/GpmcHg9h/p-27.png');

INSERT kichthuoc
VALUES('QA001', 'M'),
('QA001', 'L'),
('QA002', 'S'),
('QA002', 'M'),
('QA003', 'L');

INSERT giohang
VALUES('GH001', 'JONH NGUYEN', 'US001', 0),
('GH002', 'JADE TRAN', 'US002', 1),
('GH003', 'TRI NGUYEN', 'US003', 0),
('GH004', 'TIM DANG', 'US004', 0),
('GH005', 'DUNG LE', 'US005', 1);

INSERT ct_giohang
VALUES('GH001', 'QA001', 5),
('GH001', 'QA002', 10),
('GH002', 'QA003', 12),
('GH002', 'QA004', 20),
('GH002', 'QA005', 5);

INSERT hoadon
VALUES('HD001', 'GH001', '2021-11-8', 2770000, '0909090909', '20 NGUYEN VAN CU, QUAN 5'),
('HD002', 'GH002', '2021-11-8', 2770000, '0909090909', '20 NGUYEN VAN CU, QUAN 5'),
('HD003', 'GH002', '2021-11-8', 2770000, '0909090909', '20 NGUYEN VAN CU, QUAN 5'),
('HD004', 'GH003', '2021-11-8', 2770000, '0909090909', '20 NGUYEN VAN CU, QUAN 5'),
('HD005', 'GH003', '2021-11-8', 2770000, '0909090909', '20 NGUYEN VAN CU, QUAN 5');

INSERT ct_hoadon
VALUES('HD001', 'QA001', 12),
('HD001', 'QA003', 20),
('HD001', 'QA002', 5),
('HD002', 'QA003', 5),
('HD002', 'QA004', 5);

INSERT binhluan
values('BL001', 'QA001', 'JADE TRAN', 5, N'Sản phẩm quá tốt'),
('BL002', 'QA001', 'KHOA PUG', 3, N'Sản phẩm ổn'),
('BL003', 'QA001', 'JONH NGUYEN', 4, N'Sản phẩm ổn'),
('BL004', 'QA001', 'TRI NGUYEN', 1, N'Sản phẩm tệ'),
('BL005', 'QA001', 'TAM LE', 2, N'Sản phẩm chưa tốt'),
('BL006', 'QA001', 'JADE TRAN', 5, N'Sản phẩm quá tốt'),
('BL007', 'QA002', 'KHOA PUG', 3, N'Sản phẩm ổn'),
('BL008', 'QA002', 'JONH NGUYEN', 4, N'Sản phẩm ổn'),
('BL009', 'QA002', 'TRI NGUYEN', 1, N'Sản phẩm tệ'),
('BL010', 'QA002', 'TAM LE', 2, N'Sản phẩm chưa tốt'),
('BL011', 'QA002', 'TINH TRAN', 4, N'Sản phẩm tốt'),
('BL012', 'QA002', 'JADE TRAN', 5, N'Sản phẩm quá tốt'),
('BL013', 'QA003', 'KHOA PUG', 3, N'Sản phẩm ổn'),
('BL014', 'QA003', 'JONH NGUYEN', 4, N'Sản phẩm ổn'),
('BL015', 'QA003', 'TRI NGUYEN', 1, N'Sản phẩm tệ'),
('BL016', 'QA003', 'TAM LE', 2, N'Sản phẩm chưa tốt'),
('BL017', 'QA003', 'TINH TRAN', 4, N'Sản phẩm tốt'),
('BL018', 'QA003', 'TAM LE', 4, N'Sản phẩm tốt');