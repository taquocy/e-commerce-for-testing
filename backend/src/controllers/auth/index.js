const Boom = require("boom");
const User = require("../../models/user");
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require("../../helpers/jwt");
const Joi = require("joi");

const ValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const Register = async (req, res, next) => {
  const input = req.body;
  const { error } = ValidationSchema.validate(input);

  if (error) {
    return next(Boom.badRequest(error.details[0].message));
  }

  try {
    const isExists = await User.findOne({ email: input.email });
    if (isExists) {
      return next(Boom.conflict("This e-mail already exists."));
    }

    const user = new User(input);
    const data = await user.save();
    const userData = data.toObject();
    delete userData.password;
    delete userData.__v;

    const accessToken = await signAccessToken({
      user_id: user._id,
      role: user.role,
    });
    const refreshToken = await signRefreshToken(user._id);

    res.json({ user: userData, accessToken, refreshToken });
  } catch (e) {
    next(Boom.badImplementation("Registration error"));
  }
};

const Login = async (req, res, next) => {
  const input = req.body;
  const { error } = ValidationSchema.validate(input);

  if (error) {
    return next(Boom.badRequest(error.details[0].message));
  }

  try {
    const user = await User.findOne({ email: input.email });
    if (!user) {
      return next(Boom.notFound("The email address was not found."));
    }

    const isMatched = await user.isValidPass(input.password);
    if (!isMatched) {
      return next(Boom.unauthorized("Email or password incorrect"));
    }

    const accessToken = await signAccessToken({
      user_id: user._id,
      role: user.role,
    });
    const refreshToken = await signRefreshToken(user._id);

    const userData = user.toObject();
    delete userData.password;
    delete userData.__v;

    res.json({ user: userData, accessToken, refreshToken });
  } catch (e) {
    next(Boom.unauthorized("Login error"));
  }
};

const RefreshToken = async (req, res, next) => {
  const { refresh_token } = req.body;

  try {
    if (!refresh_token) {
      return next(Boom.badRequest("Refresh token is required"));
    }

    const user_id = await verifyRefreshToken(refresh_token);
    const user = await User.findById(user_id);
    if (!user) {
      return next(Boom.unauthorized("Invalid refresh token"));
    }

    const accessToken = await signAccessToken({
      user_id: user._id,
      role: user.role,
    });
    const refreshToken = await signRefreshToken(user_id);

    res.json({ accessToken, refreshToken });
  } catch (e) {
    next(Boom.unauthorized("Invalid refresh token"));
  }
};

const Logout = async (req, res, next) => {
  const { refresh_token } = req.body;

  try {
    if (!refresh_token) {
      return next(Boom.badRequest("Refresh token is required"));
    }

    await verifyRefreshToken(refresh_token);
    res.json({ message: "Logout successful" });
  } catch (e) {
    next(Boom.badRequest("Logout error"));
  }
};

const Me = async (req, res, next) => {
  const { user_id } = req.payload;

  try {
    const user = await User.findById(user_id).select("-password -__v");
    if (!user) {
      return next(Boom.unauthorized("User not found"));
    }
    res.json(user);
  } catch (e) {
    next(Boom.badImplementation("Error fetching user"));
  }
};

module.exports = { Register, Login, RefreshToken, Logout, Me };