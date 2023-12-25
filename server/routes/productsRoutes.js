const express = require("express");
const {
  getAllProducts,
  addProduct,
  byCategories,
  priceRange,
  sortByName,
  sortByDate,
  byName,
  filterProducts,
} = require("../controllers/productController");
const router = express.Router();

router.post("/add", addProduct);
router.get("/", getAllProducts);
router.get("/:title", byName);
router.get("/category/:category", byCategories);
router.get("/price/:minPrice/:maxPrice", priceRange);
router.get("/sort/name", sortByName);
router.get("/sort/date", sortByDate);
router.get("/filter", filterProducts);

module.exports = router;
