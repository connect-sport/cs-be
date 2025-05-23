const { internalServerError, success } = require("@shared/utils/response");
const Address = require("../models/Address");

exports.getAddresses = async (req, res) => {
  try {
    const menus = await Address.find({});
    return success(res, menus, "Lấy danh sách thành công");
  } catch (error) {
    return internalServerError(res, error.message);
  }
};
