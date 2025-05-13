const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  EMAIL_VALIDATION_REGEX,
  PHONE_VALIDATION_REGEX,
} = require("@shared/constants/regex");

const StatusCode = require("@shared/constants/statusCode");
const {
  internalServerError,
  badRequestError,
  success,
} = require("@shared/utils/response");

exports.register = async (req, res) => {
  try {
    const { name, email, password, isOwner, phoneNumber } = req.body;
    const isEmailValid = EMAIL_VALIDATION_REGEX.test(email);
    if (!isEmailValid) {
      return badRequestError(res, { message: "Email không hợp lệ" });
    }

    const isPhoneNumberValid = PHONE_VALIDATION_REGEX.test(phoneNumber);
    if (!isPhoneNumberValid && isOwner) {
      return badRequestError(res, { message: "Số điện thoại không hợp lệ" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return badRequestError(res, { message: "Email đã tồn tại" });
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hash,
      isOwner,
      phoneNumber,
    });
    await newUser.save();

    return success(res, newUser, "Đăng ký thành công", StatusCode.CREATED);
  } catch (error) {
    return internalServerError(res, error.message);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ message: "Sai email hoặc mật khẩu" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Sai mật khẩu" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.json({ token });
};
