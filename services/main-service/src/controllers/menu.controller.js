const User = require("../models/Menu");
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
  unauthorizedError,
} = require("@shared/utils/response");
const Menu = require("../models/Menu");

exports.getMenus = async (req, res) => {
  try {
    const menus = await Menu.find({}).populate("categoryId");
    return success(res, menus, "Lấy danh sách thành công");
  } catch (error) {
    return internalServerError(res, error.message);
  }
};

exports.getMenuById = async (req, res) => {
  try {
    const { id } = req.params;
    const menu = await Menu.findById({ menuId: id }).populate("menuId");
    if (!menu) {
      return badRequestError(res, { message: "Không tìm thấy danh mục" });
    }
    return success(res, menu, "Lấy danh sách thành công");
  } catch (error) {
    return internalServerError(res, error.message);
  }
};

exports.createMenu = async (req, res) => {
  try {
    const { name, alias } = req.body;

    if (!name || !alias) {
      return badRequestError(res, {
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }

    const existingMenu = await Menu.find({ name });
    if (existingMenu) {
      return badRequestError(res, { message: "Tên danh mục đã tồn tại" });
    }

    const menu = new Menu({
      name,
      alias,
    });

    await menu.save();

    return success(res, menu, "Tạo danh mục thành công");
  } catch (error) {
    return internalServerError(res, error.message);
  }
};

exports.updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, alias } = req.body;

    if (!name || !alias) {
      return badRequestError(res, {
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }

    const menu = await Menu.findByIdAndUpdate(
      id,
      { name, alias },
      { new: true }
    );

    if (!menu) {
      return badRequestError(res, { message: "Không tìm thấy danh mục" });
    }

    return success(res, menu, "Cập nhật danh mục thành công");
  } catch (error) {
    return internalServerError(res, error.message);
  }
};

exports.deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;

    const menu = await Menu.findByIdAndDelete(id);

    if (!menu) {
      return badRequestError(res, { message: "Không tìm thấy danh mục" });
    }

    return success(res, null, "Xóa danh mục thành công");
  } catch (error) {
    return internalServerError(res, error.message);
  }
};
