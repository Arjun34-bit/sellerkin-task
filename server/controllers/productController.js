const Product = require("../modals/Product");
const Seller = require("../modals/Seller");

const addProduct = async (req, res) => {
  const {
    title,
    description,
    price,
    quantity,
    category,
    keywords,
    productImage,
    sellerName,
  } = req.body;
  try {
    // const sName = sellerName.toLowerCase();
    const names = await Seller.findOne({ name: sellerName });
    if (!names) {
      res.status(404).json({ message: "Seller is Not registered" });
      return;
    }
    const product = new Product({
      title,
      description,
      price,
      quantity,
      category,
      sellerId: names._id,
      keywords,
      productImage,
      sellerName,
    });
    const newProduct = await product.save();
    res.status(200).json({ newProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const byCategories = async (req, res) => {
  const category = req.params.category;
  try {
    const products = await Product.find({ category });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const byName = async (req, res) => {
  const { title } = req.params;
  try {
    const products = await Product.find({ title });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const priceRange = async (req, res) => {
  const minPrice = req.params.minPrice;
  const maxPrice = req.params.maxPrice;
  try {
    const products = await Product.find({
      price: { $gte: minPrice, $lte: maxPrice },
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const sortByName = async (req, res) => {
  try {
    const products = await Product.find().sort({ title: 1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const sortByDate = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const filterProducts = async (req, res) => {
  const { categories, sellerName, productType, sortBy } = req.body;

  try {
    const query = {};

    if (categories) {
      query.categories = categories;
    }
    if (sellerName) {
      query.sellerName = sellerName;
    }
    if (productType) {
      query.productType = productType;
    }

    let cursor;

    if (sortBy === "name") {
      cursor = collection.find(query).sort({ name: 1 });
    } else if (sortBy === "date") {
      cursor = collection.find(query).sort({ date: 1 });
    } else {
      cursor = collection.find(query);
    }

    const result = await cursor.toArray();
    res.json(result);
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({ error: "Error fetching product details" });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  byName,
  byCategories,
  priceRange,
  sortByName,
  sortByDate,
  filterProducts,
};
