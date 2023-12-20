import { AppError } from "../../common/erros/appError.js";
import { catchAsync } from "../../common/erros/catchAsync.js";
import { generatJWT } from "../../plugins/generate-jwt.js";
import { validateUpdate, validateUserSchema } from "./user.schema.js";
import { UserService } from "./user.service.js";

export const login = catchAsync(async (req, res, next) => {
  const user = req.user;

  const token = await generatJWT(user.id);

  return res.status(202).json({
    message: "connect on",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      userID: user.accountId,
    },
    token,
  });
});

export const register = catchAsync(async (req, res, next) => {
  const newUser = req.body;

  const checkUser = await UserService.findOneByEmail(newUser.email);
  if (checkUser) {
    return next(new AppError("this email is use", 409));
  }

  const { hasError, errorMessage, userData } = validateUserSchema(newUser);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessage,
    });
  }

  const user = await UserService.userCreate(userData);

  return res.status(201).json({
    message: "connect on",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      accountId: user.accountId,
    },
  });
});

export const findAllUsers = catchAsync(async (req, res, next) => {
  const users = await UserService.findAllUsers();

  return res.status(200).json({
    message: "connect on",
    users,
  });
});

export const findById = catchAsync(async (req, res, next) => {
  const user = req.user;
  const sessionUser = req.sessionUser;
  return res.status(200).json({
    message: "connecting",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    sessionUser: {
      id: sessionUser.id,
      name: sessionUser.name,
      email: sessionUser.email,
    },
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const { hasError, errorMessage, updateData } = validateUpdate(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessage,
    });
  }

  if (
    updateData.email === sessionUser.email ||
    updateData.name === sessionUser.name
  ) {
    return next(new AppError("The email or name cannot be equal", 400));
  }

  const updateUser = await UserService.updateUser(sessionUser, updateData);

  return res.status(200).json({
    message: "update completed",
    updateUser,
  });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const deleteUser = await UserService.deleteUser(sessionUser);

  return res.status(200).json({
    message: "User Delete",
    deleteUser,  
  });
});
