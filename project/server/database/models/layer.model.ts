module.exports = (sequelize: any, Sequelize: any) => {
    const Layer = sequelize.define('layer', 
        {
            sourceId: {
                type: Sequelize.STRING,
                allowNull: false
            },
            source: {
                type: Sequelize.JSON
            },
            layers: {
                type: Sequelize.JSON
            }
        }
    );
    Layer.sync();
    return Layer;
};