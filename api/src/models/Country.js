const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id:{
      type:DataTypes.STRING(3),
      allowNull:false,
      primaryKey:true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    image:{
      type:DataTypes.STRING,
      allowNull:false
    },
    continente:{
      type: DataTypes.STRING,
      allowNull:false
    },
    capital:{
      type:DataTypes.STRING,
      allowNull:false
    },
    subregion:{
      type:DataTypes.STRING,
      allowNull:true
    },
    area:{
      type:DataTypes.STRING,
      allowNull:true
    },
    poblacion:{
      type:DataTypes.DECIMAL,
      allowNull:false
    }
  },{
    timestamps: false
  });
};
