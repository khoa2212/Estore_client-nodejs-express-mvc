const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('thuonghieu', {
    THUONGHIEU_ID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    TEN_THUONG_HIEU: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'thuonghieu',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "THUONGHIEU_ID" },
        ]
      },
    ]
  });
};
