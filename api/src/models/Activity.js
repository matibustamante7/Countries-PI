const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    // id:{
    //   type:DataTypes.INTEGER,
    //   allowNull:false,
    //   primaryKey:true,
    //   autoincrement:true
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dificultad:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    duracion:{
      type: DataTypes.TIME,
      allowNull:true
    },
    temporada:{
        type: DataTypes.STRING,
        allowNull:false
    },
    paises:{
      type:DataTypes.ARRAY(DataTypes.STRING),
      allowNull:false
    }
  },{
    timestamps: false
  });
};
