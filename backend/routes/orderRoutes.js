const express = require("express");
const router = express.Router();
const Order = require("../models/OrderModel.js");
const { auth, admin } = require("../middleware/auth");

router.get("/myorders", auth, async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

router.post("/", auth, async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ message: "No order Items" });
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

router.get("/:id", auth, async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
});

router.put("/:id/pay", auth, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
});

//admin get orders
router.get("/", auth, admin, async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
});

router.put("/:id/deliver", auth, admin, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
});

module.exports = router;
