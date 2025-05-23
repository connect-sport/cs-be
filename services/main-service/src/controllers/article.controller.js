const { internalServerError, success } = require("@shared/utils/response");
const Article = require("../models/Article");
const Category = require("../models/Category");
const { isEmpty } = require("lodash");

exports.getArticlesByAlias = async (req, res) => {
  try {
    const { alias } = req.body;
    const category = await Category.find({ alias });
    if (!category) {
      return badRequestError(res, { message: "Article not found" });
    }

    const page = Math.max(parseInt(req.body.pagination?.page) || 1, 1);
    const limit = Math.min(
      Math.max(parseInt(req.body.pagination?.limit) || 10, 1),
      100
    );
    const keyword = req.body.filters?.keyword || "";
    const address = req.body.filters?.address || "";
    const levels = req.body.filters?.levels || [];
    const skip = (page - 1) * limit;

    const query = {};

    if (category) {
      query.category = category[0]._id;
    }

    if (address) {
      query.address = address;
    }

    if (!isEmpty(levels)) {
      query.levels = {
        $in: [...levels, [], null],
      };
    }

    if (keyword.trim()) {
      query.$or = [{ description: new RegExp(keyword, "i") }];
    }

    console.log("query", query);

    const [articles, total] = await Promise.all([
      Article.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .populate("category"),
      Article.countDocuments({ title: new RegExp(keyword, "i") }),
    ]);

    return success(
      res,
      {
        data: articles,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
      "Success"
    );
  } catch (error) {
    console.log(error);
    return internalServerError(res, error.message);
  }
};

exports.createArticleByAlias = async (req, res) => {
  try {
    const { title, phoneNumber, address, description, category, levels } =
      req.body.data;

    const existCategory = await Category.findOne({ alias: category });
    if (!existCategory) {
      return badRequestError(res, { message: "Không tìm thấy danh mục" });
    }

    if (!phoneNumber) {
      return badRequestError(res, { message: "Phone number is require" });
    }

    if (!address) {
      return badRequestError(res, { message: "Address is require" });
    }

    if (!description) {
      return badRequestError(res, { message: "Description is require" });
    }

    const article = new Article({
      title,
      phoneNumber,
      address,
      description,
      category: existCategory,
      levels,
    });

    await article.save();

    return success(res, article, "Tạo bài viết thành công");
  } catch (error) {
    return internalServerError(res, error.message);
  }
};

exports.updateArticleByAlias = async (req, res) => {
  try {
    const { alias } = req.params;
    const { id, title, phoneNumber, address, description } = req.body;

    const category = await Category.findOne({ alias });
    if (!category) {
      return badRequestError(res, { message: "Không tìm thấy danh mục" });
    }

    const article = await Article.findByIdAndUpdate(
      { alias, id },
      { title, phoneNumber, address, description },
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

exports.deleteArticleByAlias = async (req, res) => {
  try {
    const { alias, id } = req.params;

    const category = await Category.findOne({ alias });
    if (!category) {
      return badRequestError(res, { message: "Not found category" });
    }

    const article = await Article.findByIdAndDelete({ alias, id });

    if (!article) {
      return badRequestError(res, { message: "Not found article" });
    }

    return success({ success: true }, "Delete article success");
  } catch (error) {
    return internalServerError(res, error.message);
  }
};
