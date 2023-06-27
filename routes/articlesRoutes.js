const router = require("express").Router();

const {
  getArticles,
  getArticle,
  createArticle,
  editArticle,
  deleteArticle,
} = require("../controllers/articlesController");

router.get("/", getArticles);
router.get("/:id", getArticle);
router.post("/", createArticle);
router.put("/:id", editArticle);
router.delete("/:id", deleteArticle);

module.exports = router;
