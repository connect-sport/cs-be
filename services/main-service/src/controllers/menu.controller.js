const {
  internalServerError,
  badRequestError,
  success,
} = require("@shared/utils/response");
const Menu = require("../models/Menu");
const { isEmpty } = require("lodash");

exports.getMenus = async (req, res) => {
  try {
    const menus = await Menu.find({});
    return success(res, menus, "Lấy danh sách thành công");
  } catch (error) {
    return internalServerError(res, error.message);
  }
};

exports.getMenuById = async (req, res) => {
  try {
    const { id } = req.params;
    const menu = await Menu.findById({ menuId: id });
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
    const { name, alias } = req.body.data;

    if (!name || !alias) {
      return badRequestError(res, {
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }

    const existingMenu = await Menu.findOne({ name, alias });

    if (!isEmpty(existingMenu)) {
      return badRequestError(res, { message: "Menu existed!" });
    }

    const menu = new Menu({
      name,
      alias,
    });

    await menu.save();

    return success(res, menu, "Create menu success!");
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
