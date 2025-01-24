import { Sequelize } from "sequelize";

const sequelize = new Sequelize("api_node", "root", "", {
    host: "localhost",
    dialect: "mysql"
});

export default sequelize;
