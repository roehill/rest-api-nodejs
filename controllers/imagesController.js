const Article = require("../models/Article");

exports.getArticles = (req, res) => {
  console.log(Article);
};

exports.getArticle = (req, res) => {
  console.log("Fetch single article");
};

exports.createArticle = (req, res) => {
  console.log("Create new article");
};

exports.editArticle = (req, res) => {
  console.log("Edit single article");
};

exports.deleteArticle = (req, res) => {
  console.log("Delete single article");
};
