const { internalServerError, success } = require("@shared/utils/response");
const Article = require("../models/Article");
const Category = require("../models/Category");
const { isEmpty } = require("lodash");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const Address = require("../models/Address");

dayjs.extend(utc);

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
    const fromDateTime = req.body.filters?.fromDateTime || "";
    const toDateTime = req.body.filters?.toDateTime || "";
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

    if (fromDateTime && toDateTime) {
      const from = dayjs(fromDateTime).utc();
      const to = dayjs(toDateTime).utc();
      query.createdAt = {
        $gte: new Date(fromDateTime),
        $lte: new Date(toDateTime),
      };
    }

    const [articles, total] = await Promise.all([
      Article.find(query)
        .skip(skip)
        .limit(limit)
        .populate("category")
        .populate("address")
        .sort({ createdAt: -1 }),
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

    const existAddress = await Address.findOne({ value: address });
    if (!existAddress) {
      return badRequestError(res, { message: "Không tìm thấy địa chỉ" });
    }

    if (!description) {
      return badRequestError(res, { message: "Description is require" });
    }

    const article = new Article({
      title,
      phoneNumber,
      address: existAddress,
      description,
      category: existCategory,
      levels,
      fromDateTime: dayjs(req.body.data.fromDateTime).toISOString(),
      toDateTime: dayjs(req.body.data.toDateTime).toISOString(),
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
