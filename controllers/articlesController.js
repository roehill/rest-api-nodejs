const Article = require("../models/Article");
const sharp = require("sharp");

exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find();

    return res.status(200).json({
      success: true,
      articles,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getArticle = async (req, res) => {
  try {
    const article = await Article.findOne({ _id: req.params.id });

    return res.status(200).json({
      success: true,
      article,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createArticle = async (req, res) => {
  try {
    const image = req.file;

    const newFilename = `small-${image.originalname}`;

    await sharp(image.path).resize(1200).toFormat("jpeg").jpeg({ quality: 90 }).toFile(`upload/${newFilename}`);

    const newArticle = new Article({
      title: req.body.title,
      slug: req.body.slug,
      imageURL: image.path,
      description: req.body.description,
      body: req.body.body,
    });

    await newArticle.save();

    return res.status(201).json({
      success: true,
      message: "New article added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editArticle = async (req, res) => {
  try {
    const article = await Article.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          slug: req.body.slug,
          imageURL: req.body.imageURL,
          description: req.body.description,
          body: req.body.body,
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: "Article updated successfully",
      article,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findOneAndDelete({ _id: req.params.id });

    return res.status(200).json({
      success: true,
      message: "Article deleted successfully",
      article,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
