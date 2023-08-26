import { model, Schema } from "mongoose";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// type
import {
  User,
  UserModel,
  Err,
  Success,
  SuccessCodes,
  ErrorCodes,
} from "../@types";

// schema instance
const userSchema = new Schema<User, UserModel>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: false,
    default: "",
  },
  is_admin: {
    type: Boolean,
    default: false,
    required: true,
  },
});

userSchema.statics.create_account = async (email: string, password: string) => {
  try {
    if (!isEmail(email)) {
      const err: Err = {
        message: "Invalid Email Address.",
        statusCode: ErrorCodes["Bad Request"],
        status: ErrorCodes[ErrorCodes["Bad Request"]],
      };

      return Promise.reject(err);
    }

    if (password.length < 8) {
      const err: Err = {
        message: "Password needs atleast 8 characters.",
        statusCode: ErrorCodes["Bad Request"],
        status: ErrorCodes[ErrorCodes["Bad Request"]],
      };
      return Promise.reject(err);
    }

    const is_present = await userModel.exists({ email });
    if (is_present) {
      const err: Err = {
        message: "An User with this email already exists.",
        statusCode: ErrorCodes["Bad Request"],
        status: ErrorCodes[ErrorCodes["Bad Request"]],
      };
      return Promise.reject(err);
    }

    const hash = await genHash(password, 12);
    const user = new userModel({
      email,
      password: hash,
      username: email.split("@")[0],
    });
    await user.save();
    const res: Success = {
      message: "Signed Up successfully!",
      statusCode: SuccessCodes.CREATED,
      status: SuccessCodes[SuccessCodes.CREATED],
    };
    return res;
  } catch (error) {
    const err: Err = {
      message: "Oops! something went Wrong",
      statusCode: ErrorCodes["Bad Request"],
      status: ErrorCodes[ErrorCodes["Bad Request"]],
    };
    return Promise.reject(err);
  }
};

userSchema.statics.login = async (email: string, password: string) => {
  try {
    const user = (await userModel.findOne({ email }).exec()) as User;
    if (!user) {
      const err: Err = {
        statusCode: ErrorCodes["Not found"],
        message: "User not found!",
        status: ErrorCodes[ErrorCodes["Not found"]],
      };
      return Promise.reject(err);
    }
    const is_valid_password = await bcrypt.compare(password, user.password);
    if (is_valid_password) {
      const token = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN as string,
        { algorithm: "HS256", expiresIn: 24 * 60 * 60 * 1000 * 2 }
      );
      return token;
    }
    const err: Err = {
      statusCode: ErrorCodes["Bad Request"],
      message: "Email and password mismatched.",
      status: ErrorCodes[ErrorCodes["Bad Request"]],
    };
    return Promise.reject(err);
  } catch (error) {
    const err: Err = {
      message: "Oops! something went Wrong",
      statusCode: ErrorCodes["Bad Request"],
      status: ErrorCodes[ErrorCodes["Bad Request"]],
    };
    return Promise.reject(err);
  }
};

userSchema.statics.get_data = async (token: string, prop: string) => {
  try {
    const decode = jwt.verify(token, process.env.REFRESH_TOKEN as string);
    const { id } = decode as jwt.JwtPayload;
    const user = (await userModel.findById({ _id: id }, prop).exec()) as User;

    const res: Success = {
      message: "user fetched successfully",
      status: SuccessCodes[SuccessCodes.OK],
      statusCode: SuccessCodes.OK,
    };
    return {
      ...res,
      user,
    };
  } catch (error) {
    const err: Err = {
      message: "snapp!! something went wrong.",
      status: ErrorCodes[ErrorCodes["Bad Request"]],
      statusCode: ErrorCodes["Bad Request"],
    };
    return Promise.reject(err);
  }
};

// creating model from schema instance
const userModel = model<User, UserModel>("user", userSchema);

// functions and methods
async function genHash(param: string, saltRound: number): Promise<string> {
  const salt: string = await bcrypt.genSalt(saltRound);
  const hash: string = await bcrypt.hash(param, salt);
  return hash;
}

export async function verifyJwt(token: string) {
  jwt.verify(token, process.env.REFRESH_TOKEN as string, (err, decoded) => {
    return new Promise((rej, res) => {
      if (err) return rej("failed to verify token.");
      res((decoded as jwt.JwtPayload).id as string);
    });
  });
}

export default userModel;
