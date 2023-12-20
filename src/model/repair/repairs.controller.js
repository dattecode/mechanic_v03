import { AppError } from "../../common/erros/appError.js";
import { catchAsync } from "../../common/erros/catchAsync.js";
import { validateRepair } from "./repairs.schema.js";
import { RepairsService } from "./repairs.service.js";

export const allPending = catchAsync(async (req, res, next) => {
  const repairs = await RepairsService.finAllRepair();

  return res.status(200).json(repairs);
});

export const createRepairs = catchAsync(async (req, res, next) => {
  const repair = req.repair;

  const { hasError, errorMessage, repairData } = validateRepair(repair);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessage,
    });
  }

  const newRepair = await RepairsService.createRepairs(repairData);

  return res.status(200).json({
    message: "connect on",
    repair: newRepair,
  });
});

export const repairsById = catchAsync(async (req, res, next) => {
  const repair = req.repair;
  return res.status(200).json({
    message: "connect on",
    repair,
  });
});

export const repairsCompleted = catchAsync(async (req, res, next) => {
  const repair = req.repair;

  if (repair.status === "completed" || repair.status === "cancelled") {
    return next(new AppError("repairs not found", 404));
  }

  const endRepair = await RepairsService.updateRepair(repair);
  return res.status(200).json({
    message: "connect on",
    endRepair,
  });
});

export const repairsDelete = catchAsync(async (req, res, next) => {
  const repair = req.repair;

  if (repair.status === "completed" || repair.status === "cancelled") {
    return next(new AppError("repairs not found", 404));
  }

  const endRepair = await RepairsService.deleteRepair(repair);
  return res.status(200).json({
    message: "connect on",
    endRepair,
  });
});
