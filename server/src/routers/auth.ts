// importing dependencies
import express, { NextFunction, Request, Response } from "express";
import { userModel as User } from "../Models/index";
import { Err, SuccessCodes, Success, ErrorCodes } from "../@types";
import { verifyJwt } from "../Models/user";

// variables
const Router = express.Router();

const loginMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.cookies?.session) {
    verifyJwt(req.cookies.session)
      .then((decode) => {
        const err: Err = {
          message: "you are already logged in",
          status: ErrorCodes[ErrorCodes["Bad Request"]],
          statusCode: ErrorCodes["Bad Request"],
        };
        res.statusCode = err.statusCode;
        res.json(err);
      })
      .catch((err) => next());
  } else next();
};

Router.post("/login", loginMiddleware, (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;
  User.login(email, password)
    .then((token) => {
      res.cookie("session", token, {
        maxAge: 24 * 60 * 60 * 1000 * 2,
        httpOnly: true,
        secure: true,
      });
      const response: Success = {
        statusCode: SuccessCodes.Accepted,
        message: "Signed in successfully!",
        status: SuccessCodes[SuccessCodes.Accepted],
      };
      res.statusCode = response.statusCode;
      res.json(response);
    })
    .catch((err: Err) => {
      res.statusCode = err.statusCode;
      res.json(err);
    });
});

Router.post("/signup", (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;
  User.create_account(email, password)
    .then((response: Success) => {
      res.statusCode = response.statusCode;
      res.json(response);
    })
    .catch((err: Err) => {
      res.statusCode = err.statusCode;
      res.json(err);
    });
});

Router.delete("/logout", (req: Request, res: Response) => {
  res.clearCookie("session");
  const response: Success = {
    message: "Logged out successfully!",
    statusCode: SuccessCodes.OK,
    status: SuccessCodes[SuccessCodes.OK],
  };
  res.json(response);
});

Router.get("/checkuser", (req: Request, res: Response) => {
  if (req.cookies?.session) {
    verifyJwt(req.cookies.session)
      .then((decode) => {
        const success: Success = {
          status: SuccessCodes[SuccessCodes.OK],
          statusCode: SuccessCodes.OK,
          message: "User found.",
        };
        res.statusCode = success.statusCode;
        res.json(success);
      })
      .catch((err) => {
        const error: Err = {
          status: ErrorCodes[ErrorCodes["Not found"]],
          statusCode: ErrorCodes["Not found"],
          message: "Not Found.",
        };
        res.statusCode = error.statusCode;
        res.json(error);
      });
  } else {
    const error: Err = {
      status: ErrorCodes[ErrorCodes["Not found"]],
      statusCode: ErrorCodes["Not found"],
      message: "Not Found.",
    };
    res.statusCode = error.statusCode;
    res.json(error);
  }
});

Router.get("/user", (req: Request, res: Response) => {
  if (!req.cookies?.session) {
    const err: Err = {
      message: "You are not authorized to access.",
      status: ErrorCodes[ErrorCodes.Unauthorized],
      statusCode: ErrorCodes.Unauthorized,
    };
    res.statusCode = err.statusCode;
    return res.json(err);
  }

  const session = req.cookies.session;
  User.get_data(
    session,
    !req.body?.property
      ? "username email is_admin"
      : (req.body.property as string).replace("password", "")
  )
    .then((data) => {
      res.statusCode = data.statusCode;
      res.json(data);
    })
    .catch((err: Err) => {
      res.statusCode = err.statusCode;
      res.json(err);
    });
});

export default Router;
