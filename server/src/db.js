const { Model, DataTypes, Sequelize } = require("@sequelize/core");

const sequelize = new Sequelize(
    "postgres://postgres:postgres@localhost:5432/test"
);


class Company extends Model {}

Company.init(
    {
        company_name: DataTypes.STRING,
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        description: DataTypes.STRING,
        owner_address: DataTypes.STRING,
        contract_address: DataTypes.STRING,
        ceo: DataTypes.STRING,
        website: DataTypes.STRING,
        goal: DataTypes.STRING,
        minimum_contribution: DataTypes.STRING, 
        deadline: DataTypes.STRING,
        image_url: DataTypes.STRING
    },
    { sequelize, modelName: "Company" }
);

module.exports = { Company, sequelize };