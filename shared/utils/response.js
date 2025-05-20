const StatusCode = require("@shared/constants/statusCode");

exports.success = (
  res,
  data = {},
  message = "Thành công",
  statusCode = StatusCode.OK
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

exports.badRequestError = (
  res,
  { message = "Đã xảy ra lỗi", statusCode = StatusCode.BAD_REQUEST }
) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

exports.internalServerError = (
  res,
  {
    message = "Internal Server Error",
    statusCode = StatusCode.INTERNAL_SERVER_ERROR,
  }
) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

exports.notFoundError = (res, message = "Không tìm thấy", statusCode = 404) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

exports.unauthorizedError = (
  res,
  { message = "Unauthorized", statusCode = StatusCode.UNAUTHORIZED }
) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

exports.fobiddenError = (
  res,
  { message = "Fobidden", statusCode = StatusCode.FORBIDDEN }
) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};
