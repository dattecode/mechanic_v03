import { Sequelize } from "sequelize";
import envs from "../enviroments/envioroments.js";


export const sequelize = new Sequelize(envs.DB_URL, {
  logging:false
})


export const authenticated = async () => {
  try {
    await sequelize.authenticate()
    console.log("authenticated on");
  } catch (error) {
    console.log(error);
  }
}

export const syncON = async () => {
  try {
    await sequelize.sync()
    console.log("syncro on");
  } catch (error) {
    console.log(error);
  }
}
