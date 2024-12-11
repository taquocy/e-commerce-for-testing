import Boom from "boom";
import User from "../../models/user";
import { OAuth2Client } from "google-auth-library";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../../helpers/jwt";
import ValidationSchema from "./validations";
const client = new OAuth2Client('290524274843-3kcf9c3gk5cku9608embdd0ickj9c3ul.apps.googleusercontent.com');

const GoogleLogin = async (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return next(Boom.badRequest('Google token is required.'));
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '290524274843-3kcf9c3gk5cku9608embdd0ickj9c3ul.apps.googleusercontent.com', // Google Client ID
    });

    const payload = ticket.getPayload();
    const email = payload.email;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        username: payload.name,
        googleId: payload.sub,
      });
      await user.save();
    }

    const accessToken = await signAccessToken({
      user_id: user._id,
      role: user.role,
    });
    const refreshToken = await signRefreshToken(user._id);

    res.json({
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error('Error during Google Login:', error);
    return next(Boom.unauthorized('Invalid Google token.'));
  }
};

const Register = async (req, res, next) => {
	const input = req.body;
		

	const { error } = ValidationSchema.validate(input);

	if (error) {
		return next(Boom.badRequest(error.details[0].message));
	}

	try {
		const isExists = await User.findOne({ email: input.email });

		if (isExists) {
			return next(Boom.conflict("This e-mail already using."));
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

		res.json({
			user: userData,
			accessToken,
			refreshToken,
		});
	} catch (e) {
		next(e);
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
			throw Boom.notFound("The email address was not found.");
		}

		const isMatched = await user.isValidPass(input.password);
		if (!isMatched) {
			throw Boom.unauthorized("email or password not correct");
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
		return next(e);
	}
};

const RefreshToken = async (req, res, next) => {
	const { refresh_token } = req.body;

	try {
		if (!refresh_token) {
			throw Boom.badRequest();
		}

		const user_id = await verifyRefreshToken(refresh_token);
		const accessToken = await signAccessToken(user_id);
		const refreshToken = await signRefreshToken(user_id);

		res.json({ accessToken, refreshToken });
	} catch (e) {
		next(e);
	}
};

const Logout = async (req, res, next) => {
	try {
		const { refresh_token } = req.body;
		if (!refresh_token) {
			throw Boom.badRequest();
		}

		const user_id = await verifyRefreshToken(refresh_token);		

		if (!data) {
			throw Boom.badRequest();
		}

		res.json({ message: "success" });
	} catch (e) {
		console.log(e);
		return next(e);
	}
};

const Me = async (req, res, next) => {
	const { user_id } = req.payload;

	try {
		const user = await User.findById(user_id).select("-password -__v");

		res.json(user);
	} catch (e) {
		next(e);
	}
};

export default {
	Register,
	Login,
	RefreshToken,
	Logout,
	Me,
};
