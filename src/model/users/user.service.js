import { UserModel } from "./user.model.js";

export class UserService {
  static async findAllUsers() {
    return await UserModel.findAll({
      where: {
        status: "active",
      },
      attributes: ["id", "name", "email", "accountId","status"],
    });
  }

  static async findOneId(id) {
    return await UserModel.findOne({
      where: {
        id,
        status: "active",
      },
      attributes: ["id", "name", "email", "accountId"],
    });
  }

  static async findOneByEmail(email) {
    return await UserModel.findOne({
      where: {
        email,
        status: "active",
      },
      attributes: ["id", "name", "email", "accountId"],
    });
  }

  static async findLogin(email) {
    return await UserModel.findOne({
      where: {
        email,
        status: "active",
      },
    });
  }

  static async findOneByAccountId(accounId) {
    return await UserModel.findOne({
      where: {
        accounId,
        status: "active",
      },
      attributes: ["id", "name", "email", "accountId"],
    });
  }

  static async userCreate(data) {
    return await UserModel.create(data);
  }

  static async deleteUser(user) {
    return await user.update({
      status: "inactive",
    });
  }

  static async updateUser(user, data) {
    return await user.update(data);
  }
}
