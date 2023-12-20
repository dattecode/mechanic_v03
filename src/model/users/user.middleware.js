import { AppError } from "../../common/erros/appError.js";
import envs from "../../config/enviroments/envioroments.js";
import { UserService } from "./user.service.js";
import { promisify } from "util";
import jwt from "jsonwebtoken";
import { catchAsync } from "../../common/erros/catchAsync.js";
import { validateLogin } from "./user.schema.js";
import bcrypt from "bcrypt";

export const chekedId = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await UserService.findOneId(id);
  if (!user) {
    return next(new AppError("this is operational error", 400));
  }
  req.user = user;
  next();
});

export const chekedEmail = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await UserService.findOneByEmail(email);
  if (!user) {
    return next(new AppError("this is operational error", 406));
  }
  req.user = user;
  next();
});

export const loginCheck = catchAsync(async (req, res, next) => {
  const { hasError, errorMessage, loginData } = validateLogin(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessage,
    });
  }

  const user = await UserService.findLogin(loginData.email);

  if (!user) {
    return next(new AppError("this is operational error", 400));
  }
  const passwordCheck = await bcrypt.compare(loginData.password, user.password);
  if (!passwordCheck) {
    return next(new AppError("this is operational error", 400));
  }

  req.user = user;
  next();
});

export const protect = catchAsync(async (req, res, next) => {
  //get token
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  //validate token
  if (!token) {
    return next(
      new AppError("Your are not login, please login to access ", 401)
    );
  }

  //decode Token
  const decodedToken = await promisify(jwt.verify)(token, envs.SECRET_JWT_SEED);

  //search user by token
  const user = await UserService.findOneId(decodedToken.id);
  if (!user) {
    return next(new AppError("this is operational error", 400));
  }

  //add the user in session
  req.sessionUser = user;
  next();
});
