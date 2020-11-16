const express = require("express");
const router = express.Router();
const Product = require("../models/ProductModel");
const { auth } = require("../middleware/auth.js");
const { admin } = require("../middleware/auth.js");

router.get("/", async (req, res) => {
  try {
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;
    const min = Number(req.query.minPrice);
    const max = Number(req.query.maxPrice);
    const sort =
      req.query.sort === "price_desc"
        ? { price: -1 }
        : req.query.sort === "price_asc"
        ? { price: 1 }
        : req.query.sort === "rating_desc"
        ? { rating: -1 }
        : req.query.sort === "rating_asc"
        ? { rating: 1 }
        : {};

    const cat =
      req.query.category.length &&
      req.query.category !== "null" &&
      req.query.category.split(",");
    const checkbox =
      cat && cat !== null && cat.length !== 0 ? { category: { $in: cat } } : {};

    const keyword =
      min || max
        ? { price: { $gte: min, $lte: max } }
        : req.query.keyword
        ? {
            name: {
              $regex: req.query.keyword,
              $options: "i",
            },
          }
        : {};

    const count = await Product.countDocuments({ ...keyword, ...checkbox });
    const maxprice = await Product.findOne().sort({ price: -1 });
    const minprice = await Product.findOne().sort({ price: +1 });
    const products = await Product.find({ ...keyword, ...checkbox })
      .sort({ ...sort })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      products,
      price: { maxprice: maxprice.price, minprice: minprice.price },
      page,
      pages: Math.ceil(count / pageSize),
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", auth, admin, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product Removed" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

router.put("/:id", auth, admin, async (req, res) => {
  const product = await Product.findById(req.params.id);
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// CREATE PRODUCT
router.post("/", auth, admin, async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample Brand",
    category: "Other",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

router.post("/:id/review", auth, async (req, res) => {
  const product = await Product.findById(req.params.id);
  const { rating, comment } = req.body;
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400).json({ message: "You already reviewed this product" });
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

router.put("/:id/deletereview", auth, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    var filteredreviews = product.reviews.filter(
      (review) => review._id.toString() !== req.body.reviewid.toString()
    );
    product.reviews = filteredreviews;
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: "Review Removed" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

//GET TOP PRODUCTS
router.get("/top/list", async (req, res) => {
  const topProducts = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(topProducts);
});

module.exports = router;
