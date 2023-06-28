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

    const newFilename = "Asdsad";

    await sharp(image.path)
      .resize(640, 320)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`upload/${image.originalname}`);

    const newArticle = new Article({
      title: req.body.title,
      slug: req.body.slug,
      imageURL: image.path,
      description: req.body.description,
      body: req.body.body,
    });

    console.log(image);

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

exports.editArticle = (req, res) => {
  console.log("Edit single article");
};

exports.deleteArticle = (req, res) => {
  console.log("Delete single article");
};
