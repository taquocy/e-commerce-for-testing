import Boom from "boom";
import User from "../../models/user";

// helpers
import {
	signAccessToken,
	signRefreshToken,
	verifyRefreshToken,
} from "../../helpers/jwt";

// validations
import ValidationSchema from "./validations";


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

const changePassword = async (req, res) => {
	const { oldPassword, newPassword } = req.body;
	const userId = req.user.id;
  
	try {
	  const user = await User.findById(userId);
	  if (!user) {
		return res.status(404).json({ message: 'Người dùng không tồn tại' });
	  }
  
	  const isMatch = bcrypt.compareSync(oldPassword, user.password);
	  if (!isMatch) {
		return res.status(400).json({ message: 'Mật khẩu cũ không đúng' });
	  }
  
	  user.password = bcrypt.hashSync(newPassword, 10);
	  await user.save();
  
	  res.status(200).json({ message: 'Đổi mật khẩu thành công' });
	} catch (error) {
	  res.status(500).json({ message: 'Có lỗi xảy ra khi đổi mật khẩu' });
	}
  };
  
  app.put('/api/change-password', authenticate, changePassword);
  

const updateProfile = async (req, res) => {
	const { email, name, password } = req.body;
	const userId = req.user.id;
  
	try {
	  const user = await User.findById(userId);
	  if (!user) {
		return res.status(404).json({ message: 'Người dùng không tồn tại' });
	  }
  
	  if (email) user.email = email;
	  if (name) user.name = name;
	  if (password) user.password = bcrypt.hashSync(password, 10);
  
	  await user.save();
	  res.status(200).json({ message: 'Cập nhật thông tin thành công' });
	} catch (error) {
	  res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật' });
	}
  };
  
  app.put('/api/profile', authenticate, updateProfile);
  

export default {
	Register,
	Login,
	RefreshToken,
	Logout,
	Me,
};
