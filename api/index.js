//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {getAllCountriesController} = require('./src/controllers/countriesController');
const {Country} = require('./src/db')
const port = 3001;

const crearInfoDb = async() => {
  if (!(await Country.count())) {
    const allCountries = await getAllCountriesController();
    await Country.bulkCreate(allCountries);
    return await Country.findAll();
  }else{
    return await Country.findAll()
  }
}




crearInfoDb();

// Syncing all the models at once.
  server.listen(port, async () => {
    await conn.sync({alter:false})
    .then(() => console.log('%s listening at 3001'))
    .catch(err => console.error(err.message))
  });

