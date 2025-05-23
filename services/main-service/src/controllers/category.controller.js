const {
  internalServerError,
  success,
  badRequestError,
} = require("@shared/utils/response");
const Category = require("../models/Category");

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});

    return success(res, categories, "Lấy danh sách thành công");
  } catch (error) {
    console.log(error);
    return internalServerError(res, error.message);
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return badRequestError(res, { message: "Không tìm thấy danh mục" });
    }

    return success(res, category, "Lấy danh sách thành công");
  } catch (error) {
    return internalServerError(res, error.message);
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, alias } = req.body.data;

    if (!name || !alias) {
      return badRequestError(res, {
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }

    const existingCategory = await Category.findOne({ name, alias });
    if (existingCategory) {
      return badRequestError(res, { message: "Tên danh mục đã tồn tại" });
    }

    const category = new Category({
      name,
      alias,
    });

    await category.save();

    return success(res, category, "Tạo danh mục thành công");
  } catch (error) {
    return internalServerError(res, error.message);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, alias } = req.body;

    if (!name || !alias) {
      return badRequestError(res, {
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }

    const category = await Category.findByIdAndUpdate(
      id,
      { name, alias },
      { new: true }
    );

    if (!category) {
      return badRequestError(res, { message: "Không tìm thấy danh mục" });
    }

    return success(res, category, "Cập nhật danh mục thành công");
  } catch (error) {
    return internalServerError(res, error.message);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return badRequestError(res, { message: "Không tìm thấy danh mục" });
    }

    return success(res, category, "Xóa danh mục thành công");
  } catch (error) {
    return internalServerError(res, error.message);
  }
};
