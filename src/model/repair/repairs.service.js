import { UserModel } from "../users/user.model.js";
import { RepairsModel } from "./repairs.model.js";

export class RepairsService {

  static async finAllRepair() {
    return await RepairsModel.findAll({
      where: {
        status: "pending",
      },
      attributes: ["id", "date", "motorsNumber","description","userId"],
      include: [
        {
          model: UserModel,
          attributes: ["id", "name", "email"]
        },
      ]
    });
  }

  static async findById(id) {
    return await RepairsModel.findOne({
      where: {
        id,
        status: "pending",
      },
      attributes: ["id", "date", "motorsNumber","description","userId"],
      include: [
        {
          model: UserModel,
          attributes: ["id", "name", "email"]
        }
      ]
    });
  }

  static async verificRepair(id){
    return await RepairsModel.findOne({
      where:{
        id
      }
    })
  }

  static async findRepairAllsAccountID(accountId) {
    return await RepairsModel.findAll({
      where: {
        accountId,
      },
    });
  }

  static async findByAccountIdPending(accountId) {
    return await RepairsModel.findAll({
      where: {
        accountId,
        status: "pending",
      },
    });
  }

  static async createRepairs(data) {
    return await RepairsModel.create(data);
  }

  static async updateRepair(user) {
    return await user.update({
      status: "completed",
    });
  }

  static async deleteRepair(user) {
    return await user.update({
      status: "cancelled",
    });
  }
}
