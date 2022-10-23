const {models} = require('../../models');
const {Sequelize} = require("sequelize");
const ct_giohang1=models.ct_giohang;
// exports.list = (page = 0, itemPerPage = 9) => {
//     return models.quanao.findAll({
//         attributes: ['QUANAO_ID', 'LOAI.TEN_LOAI', 'MAU', 'GIOI_TINH', 'THUONGHIEU.TEN_THUONG_HIEU', 'LINK', 'GIA'],
//         include: [{
//                 model: models.loai,
//                 as: "LOAI",
//                 required: true
//             },
//             {
//                 model: models.thuonghieu,
//                 as: "THUONGHIEU",
//                 required: true
//             }
//         ],
//         where: [{
//             DA_XOA:{[Sequelize.Op.is]: false}
//         }],
//         offset: page * itemPerPage,
//         limit: itemPerPage,
//         raw: true
//     });
// };

exports.list = (page = 0, searchName, gt, price1, price2, mau, itemPerPage = 9) => {
    if (searchName && searchName !== "")
        return models.quanao.findAll({
            attributes: ['QUANAO_ID', 'LOAI.TEN_LOAI', 'MAU', 'GIOI_TINH', 'THUONGHIEU.TEN_THUONG_HIEU', 'LINK', 'GIA'],
            include: [{
                model: models.loai,
                as: "LOAI",
                required: true,
                where: {
                    TEN_LOAI: {
                        [Sequelize.Op.substring]: searchName
                    }
                }
            },
                {
                    model: models.thuonghieu,
                    as: "THUONGHIEU",
                    required: true

                }
            ],
            where: [{
                DA_XOA: {
                    [Sequelize.Op.is]: false
                },
                GIOI_TINH: gt,
                GIA: {
                    [Sequelize.Op.between]: [price1, price2]
                },
                MAU: mau


            }],
            offset: page * itemPerPage,
            limit: itemPerPage,
            raw: true
        });
    else
        return models.quanao.findAll({
            attributes: ['QUANAO_ID', 'LOAI.TEN_LOAI', 'MAU', 'GIOI_TINH', 'THUONGHIEU.TEN_THUONG_HIEU', 'LINK', 'GIA'],
            include: [{
                model: models.loai,
                as: "LOAI",
                required: true,


            },
                {
                    model: models.thuonghieu,
                    as: "THUONGHIEU",
                    required: true

                }
            ],
            where: [{
                DA_XOA: {
                    [Sequelize.Op.is]: false
                }

            }],
            offset: page * itemPerPage,
            limit: itemPerPage,
            raw: true
        });
};

exports.showDetail = (ID) => {
    return models.quanao.findAll({
        attributes: ['QUANAO_ID', 'LOAI.TEN_LOAI', 'MAU', 'GIOI_TINH', 'THUONGHIEU.TEN_THUONG_HIEU', 'LINK', 'GIA'],
        include: [{
            model: models.loai,
            as: "LOAI",
            required: true
        },
            {
                model: models.thuonghieu,
                as: "THUONGHIEU",
                required: true
            }
        ],
        where: [{
            [Sequelize.Op.or]: [
                { QUANAO_ID: ID }
            ]
        }],
        raw: true
    });
};

exports.Commentlist = (ID, page = 0, itemPerPage = 2) => {
    return models.binhluan.findAll({
        attributes: ['QUANAO_ID', 'USERNAME', 'DIEM', 'NOI_DUNG'],
        include: [{
            model: models.quanao,
            as: "QUANAO",
            required: true
        }],
        where: [{
            [Sequelize.Op.or]: [
                { QUANAO_ID: ID }
            ]
        }],

        offset: page * itemPerPage,
        limit: itemPerPage,
        raw: true
    });
};

//thay doi 
exports.createCart = async (giohang_id, quanao_id,so_luong) => {

    const a= await ct_giohang1.create({GIOHANG_ID: giohang_id, QUANAO_ID: quanao_id,SO_LUONG:so_luong});
 
    return a;
 }
// thay doi
exports.Update = async (GIOHANG_ID1, QUANAO_ID1, SO_LUONG1) => {
    console.log('a');

    const b=await models.ct_giohang.update({
        SO_LUONG: SO_LUONG1
    }, {
        where: {
            GIOHANG_ID: GIOHANG_ID1,
            QUANAO_ID: QUANAO_ID1
        },
    });
    return b;
} 

// thay doi
exports.findCartDetail = async (giohang_id, quanao_id) => {
    return await models.ct_giohang.findOne({
        where: {
            QUANAO_ID: quanao_id,
            GIOHANG_ID: giohang_id
        },
        raw: true
    })
}

// thay doi
exports.addCart = async (user_id) => {
    const gh = await models.giohang.findOne({
        where: {
            USER_ID: user_id
        },
        raw: true
    })
    return gh
}
//thay doi
exports.listUser = (id) => {
    return models.users.findAll({
        where: {
            USER_ID: id
        },
        raw: true
    })
}