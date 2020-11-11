const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((err: any) => {
    console.error('Unable to connect to the database:', err);
}); 
const db = {
    'Sequelize': Sequelize,
    'sequelize': sequelize,
    'Layer': require('../models/layer.model')(sequelize, Sequelize),
    'PG_Geometry': require('../models/geometry.model')(sequelize, Sequelize)
}
export default db;