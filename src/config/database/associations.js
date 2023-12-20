import { UserModel } from "../../model/users/user.model.js";
import { RepairsModel } from "../../model/repair/repairs.model.js";

export const initModel = () => {
  UserModel.hasMany(RepairsModel, {
    foreignKey: "userId",
    sourceKey: "accountId",
  });
  RepairsModel.belongsTo(UserModel, {
    foreignKey: "userId",
    targetKey: "accountId",
  });
};
