const { internalServerError, success } = require("@shared/utils/response");
const Article = require("../models/Article");

exports.getArticleByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const articles = await Article.find({ categoryId }).populate("idCategory");
    if (!articles) {
      return badRequestError(res, { message: "Không tìm thấy danh mục" });
    }

    return success(res, articles, "Lấy danh sách bài viết thành công");
  } catch (error) {
    return internalServerError(res, error.message);
  }
};

exports.createArticleByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { title, content } = req.body;

    const article = new Article({
      title,
      content,
      categoryId,
    });

    await article.save();

    return success(res, article, "Tạo bài viết thành công");
  } catch (error) {
    return internalServerError(res, error.message);
  }
};

exports.updateArticleByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { title, content } = req.body;

    const article = await Article.findByIdAndUpdate(
      categoryId,
      { title, content },
      { new: true }
    );

    if (!article) {
      return badRequestError(res, { message: "Không tìm thấy bài viết" });
    }

    return success(res, article, "Cập nhật bài viết thành công");
  } catch (error) {
    return internalServerError(res, error.message);
  }
};

exports.deleteArticleByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const article = await Article.findByIdAndDelete(categoryId);

    if (!article) {
      return badRequestError(res, { message: "Không tìm thấy bài viết" });
    }

    return success(res, article, "Xóa bài viết thành công");
  } catch (error) {
    return internalServerError(res, error.message);
  }
};
