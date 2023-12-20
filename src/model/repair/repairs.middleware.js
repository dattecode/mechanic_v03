import { catchAsync } from "../../common/erros/catchAsync.js";
import { UserService } from "../users/user.service.js";
import { RepairsService } from "./repairs.service.js";

export const checkCreateRepair = catchAsync(async (req, res, next) => {
  const repair = req.body;

  const user = await UserService.findOneId(repair.userId);
  if (!user) {
    return next(new AppError("this is operational error", 400));
  }

  const { accountId } = user;
  repair.userId = accountId;

  req.repair = repair;
  next();
});

export const checkId = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const repair = await RepairsService.findById(id);
  req.repair = repair;
  next();
});
