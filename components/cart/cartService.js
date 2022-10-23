const { raw } = require('body-parser');
const { models } = require('../../models');

exports.list = (id) => {
      return models.giohang.findOne({
        
        where: {
            USER_ID: id
        },
        raw: true

    });
};

exports.listDetail =(ID)=>{
    return models.ct_giohang.findAll({
        where: {
            GIOHANG_ID:ID
        },
        raw:true
    });
};

exports.listQuanAoDetail= (ID)=>{
    return models.quanao.findOne({
        include:[{
            model: models.loai,
            as: "LOAI",
            required:true,
           
        },],
        where:{
            QUANAO_ID:ID
        },
        raw:true
    })
}


exports.remove = async(giohang_id,quanao_id) => {
    try {
        let res = await models.ct_giohang.destroy({
            where: {
                GIOHANG_ID:giohang_id,
                QUANAO_ID:quanao_id
            }
        })
    } catch (error) {
        console.log('error:' + error);
        return null;
    }
}
exports.removeAll = async(giohang_id)=>{
    try {
        let res = await models.ct_giohang.destroy({
            where: {
                GIOHANG_ID:giohang_id,
            }
        })
    } catch (error) {
        console.log('error:' + error);
        return null;
    }
}