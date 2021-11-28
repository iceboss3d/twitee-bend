import { AuthValidate } from "../validator/index.js";
import { User } from "../models/index.js";
import { response } from "../helpers/response.js";
import { generateToken } from "../utilities/tokenGenerator.js";
import bcrypt from 'bcrypt';


export const signUp = async (req, res) => {
  try {
    const validate = await AuthValidate.validateAsync(req.body);

    let isExisting = await User.findOne({ where: { email: req.body.email } });
    if (isExisting) {
      return response.error(res, "User already exist with such email", 409);
    }

    const username = await validate.email.substring(0, validate.email.indexOf("@"))
    
    const hash = async (value) => {
      const salt = await bcrypt.genSalt(10);
      const hashed = bcrypt.hashSync(value, salt);
      return hashed;
    };

    const user = await User.create({
      name: username,
      email: validate.email,
      password: await hash(validate.password),
    });

    const { name, email, _id } = user;

    //send email

    return response.successWithData(
      res,
      "Signup successfull",
      { _id, name, email },
      201
    );
  } catch (error) {
    if (error.isJoi) {
      return response.validationError(res, error.details);
    }
    return response.error(res, error.message);
  }
};

export const login = async (req, res) => {
  try {
    const validate = await AuthValidate.validateAsync(req.body);
    let user = await User.findOne({ where: { email: validate.email }});
    if (!user || !(bcrypt.compareSync(validate.password, user.password))) {
      return response.error(res, "Invalid Credentials", 403);
    }

    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      created: user.created,
    };

    var token = generateToken(userResponse);
    return response.successWithData(res, "Login Successful", {
      ...userResponse,
      token,
    });
  } catch (error) {
    if (error.isJoi) {
      return response.validationError(res, error.details);
    }
    return response.error(res, error.message);
  }
};
