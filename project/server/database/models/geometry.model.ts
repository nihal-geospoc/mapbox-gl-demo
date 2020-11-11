module.exports = (sequelize: any, Sequelize: any) => {
    const PG_Geometry = sequelize.define('pg_geometry', 
        {
            gid: {
                autoIncrement: true,
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            geom: {
                type: Sequelize.GEOMETRY,
                allowNull: false
            }
        },
        {
            // don't add the timestamp attributes (updatedAt, createdAt)
            timestamps: false,

            // disable the modification of tablenames; By default, sequelize will automatically
            // transform all passed model names (first parameter of define) into plural.
            // if you don't want that, set the following
            freezeTableName: true,

            // define the table's name
            tableName: 'pg_geometry'
        }
    );
    PG_Geometry.sync();
    return PG_Geometry;
};