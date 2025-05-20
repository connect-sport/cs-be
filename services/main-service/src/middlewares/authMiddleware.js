const { unauthorizedError, fobiddenError } = require("@shared/utils/response");
const jwt = require("jsonwebtoken");

exports.requireAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return unauthorizedError(res, { message: "Chưa đăng nhập" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return fobiddenError(res, {
      message: "Token không hợp lệ hoặc đã hết hạn",
    });
  }
};
